--- 
layout  : wiki
title   : mysql (storage engine)
summary : 
date    : 2020-05-28 07:48:47 +0900
lastmod : 2020-06-02 20:05:53 +0900
tags    : [mysql, storage engine]
draft   : false
parent  : 
---

# 참고용 홈페이지 
 1. https://dev.mysql.com/doc/internals/en/custom-engine.html
 2. mysql architecture
   * ![mysql architecture](/wiki/images/mysql_architecture.png)
 3. https://dev.mysql.com/doc/dev/mysql-server/latest/PAGE_PFS_PSI.html

## 환경 설정
 * 일단 지금 집에다가 예전에 썻던 삼성 노트북을 wol 으로 설정하고 (완전히 꺼지면 안켜지니까 shutdown 을 alias 해놓고, suspend를 사용하는 식으로 했다.휴가 때 마다 혹은 가끔씩 reboot 해주면 되겠지?)
 * github 에서 다운로드 해서 private repository 에다가 올려놨다.
```bash
$ git clone https://github.com/mysql/mysql-server
```
 * 참고용 홈페이지 1을 보면 알 수 있듯이 `storage/example` 을 똑같이 카피했다.
 * 일단 지금 목표는 custom engine 을 만들어 보는 거고 가능하다면 2018년 FAST 에 나온 논문인 FAST_PAIR 를 만들어보는거다.
 * 일단 공부한 내용을 아래에 써놓겠다.
## 겪었던 문제들
 * git push 를 할때 너무 많아서 그런지 안올라가진다. -> 브랜치를 나눠서 올리면 된다. mysql 8.0.0 까진 수월하게 올라간다. mysql-8.0.0 브랜치까지 올리고 나머지 올리면 올라가진다. 용량이 커서 안올라가지는 것 같다.

 
## 코딩할 때 알아야할 내용
### mysys.h 관련
 1. `include/mysys.h` 에 사용할만한 함수들이 많이 정리되어 있다.
 2. File 관련 : `my_create`, `my_close`
 3. 문자열 관련 : `fn_format` (filename format) - `to`(buffer variable), `name`, `dir`, `extension`, `flags` 순서
 4. Memory 관련 : `my_malloc`, `my_free`
### THD (mysql thread 객체) 관련
 1. mysql thread 객체 (`THD`) 에 변수로 넣으면 (`THDVAR_SET`) 복사가 일어난다. (추측) -> 따라서 넣어야할 값이 있으면 my_malloc 하고 넣은다음에 my_free 해줘야한다. (Memory Leak 나지 않게 조심하자!)
 2. Mysql Thread 객체 (THD)에 값 확인, 넣기 : `THDVAR(대상 Thread, 원하는 변수명)`, `THDVAR_SET(대상 Thread, 원하는 변수명, 값의 주소)`
 
 
### Debug
 1. Debug를 위해서 return 같은거 할때 `DBUG_RETURN` 을 적극적으로 활용하자

 
# 참고용 홈페이지 읽고 정리하기
### 23.2 Overview
 * `handler`라는 interface를 구현하도록 되어 있는데, 각 connection 마다 thread가 생성되고 각 thread마다 handler instance를 생성하고 가지고 있도록 한다.
   *  질문점 : 그러면 각 handler들이 같은 table에 접근하게 되면 어떻게 되나 : handler를 구현할때 알아서 해결해야 한다. 가장 단순한 해결법은 table마다 lock을 가지게 해서 동시에 handler들이 접근 못하도록 하는것. (생각해보면 read lock, write lock마다 구현법도 다양하고 mvcc같은거 고려하면 생각할게 너무 많을 텐데 당연하게도 storage engine이 알아서 처리하도록 하는게 맞다)
 * read-only -> insert, update, delete -> indexing, transactions -> other advanced options 순서로 구현하라고 한다.
### 23.3 Creating Storage Engine Source Files
 * `example` 을 복사해서 수정하는게 제일 단순하다 (사실 이렇게 공식 홈페이지 적어놓을만 한게, innobase(=innodb)코드를 보고 비슷하게 만들어보려고 시도했는데, 나에게는 이건 너무 어려웠다. ㅠ)
### 23.4 Adding Engine Specific Variables and Parameters
 * 구조가 Plugin 식으로 추가되는 식인것 같은데 그래서 Plugin 을 만드는 방법에 대해서 나와있다.
 * 이걸 열심히 공부하는것도 맞지만, 조금 목표와 멀어질 것 같아서 일단은 innobase 꺼 CMakeLists.txt 를 참고했고, 나중에 필요하면 다시 보면 될거라고 생각한다.
### 23.5 Creating the handlerton
 * `handlerton` (= handler singleton) : storage engine 마다 1개씩 있는 객체로, transaction을 다루는 commit, rollbacks 같은 기능을 제공하게 된다.
```cpp
typedef struct
  {
    const char *name; /* storage engine 의 이름 : CREATE TABLE ... ENGINE=FOO; 에 쓰인다. */
    SHOW_COMP_OPTION state; /* SHOW STORAGE ENGINES command를 사용하면 출력되는 값 */
    const char *comment; /* SHOW  STORAGE ENGINES command를 사용할때 출력되는 설명 */
    enum db_type db_type; /* custom engine 은 반드시 DB_TYPE_UNKNOWN 을 사용해야한다고 합니다. */
    bool (*init)(); /* Server 가 시작할때 딱 1번 불리게 되고, handler가 instance 화 되기 전에 처리되야할 내용을 넣으면된다. */
    uint slot; /* storage engine 마다 고유하게 가지고있는 메모리 영역 thd->ha_data[foo_hton.slot]으로 접근가능하고, Rollback 구현할떄 참조하라고 적혀있음 */
    uint savepoint_offset; /* savepoint 의 위치, 0이면 savepoint memory가 필요하지 않다. */
    int  (*close_connection)(THD *thd);
    int  (*savepoint_set)(THD *thd, void *sv);
    int  (*savepoint_rollback)(THD *thd, void *sv);
    int  (*savepoint_release)(THD *thd, void *sv);
    int  (*commit)(THD *thd, bool all);
    int  (*rollback)(THD *thd, bool all);
    int  (*prepare)(THD *thd, bool all);
    int  (*recover)(XID *xid_list, uint len);
    int  (*commit_by_xid)(XID *xid);
    int  (*rollback_by_xid)(XID *xid);
    void *(*create_cursor_read_view)();
    void (*set_cursor_read_view)(void *);
    void (*close_cursor_read_view)(void *);
    handler *(*create)(TABLE *table);
    void (*drop_database)(char* path);
    int (*panic)(enum ha_panic_function flag);
    int (*release_temporary_latches)(THD *thd);
    int (*update_statistics)();
    int (*start_consistent_snapshot)(THD *thd);
    bool (*flush_logs)();
    bool (*show_status)(THD *thd, stat_print_fn *print, enum ha_stat_type stat);
    int (*repl_report_sent_binlog)(THD *thd, char *log_file_name, my_off_t end_offset);
    uint32 flags;
  } handlerton;
```
 * 적다보니 아래 부분은 transcation 을 구현할때나 필요한 부분이라 나중에 생각하기로 했다. 대충 공식 메뉴얼정도만 읽었고 굳이 번역해놓을 필요는 없을듯?
 
### 23.6 Handling Handler Instantiation

```cpp
static handler* example_create_handler (TABLE* table);
```
 * handler 생성 함수를 만들어야된다.
 * handler constructor를 단순히 호출하는 형식으로 구현할 수도 있다. (아래 예시는 myisam 의 구현)
```cpp
static handler *myisam_create_handler(TABLE *table)
  {
    return new ha_myisam(table);
  }
```

 * constructor 의 구현 예시
```cpp
ha_federated::ha_federated(TABLE *table_arg)
  :handler(&federated_hton, table_arg),
    mysql(0), stored_result(0), scan_flag(0),
    ref_length(sizeof(MYSQL_ROW_OFFSET)), current_position(0)
    {}
```

### 23.7 Defining Filename Extensions
 * 지원하는 확장자를 `const char* []` 로 넘기면 처리해준다
 * 단 array 의 마지막 은 `NullS` 로 끝나야함.
 * 아래 코드는 csv 예시
  
```cpp
static const char *ha_tina_exts[] = {
  ".CSV",
  NullS
};
```
 * 이렇게 정의된 array를 다음과 같이 설정해주면 됨.
  
```cpp
const char **ha_tina::bas_ext() const
{
  return ha_tina_exts;
}
```

 * `DROP TABLE` 에서 table을 지웠을 때 파일이 삭제되는 기능을 딱히 구현하지 않고 생략해도 된다.
 * 근데 이건 필수가 아닌 건지, `handler` class에 따로 선언되어 있지는 않다. -> 직접 구현했는데 혹시 문제가 생길수도 있으니 메모해놓는다.

### 23.8 Creating Tables

```cpp
virtual int create(const char *name, TABLE *form, HA_CREATE_INFO *info)=0;
```

 * 위 함수를 반드시 구현하라고 한다.
 * `name` 은 `table`의 이름
 * `form` 은 `tablename` 이랑 매칭되는 `TABLE` structure : `tablename.frm` 이라는 파일에 이미 다 만들어 놨으니, Storage Engine은 이를 변경하면 안됨.
 * `info` 는 `CREATE TABLE`을 했을 때 생기는 정보. `handler.h`에 정의 되어 있으니 참조.
  
```cpp
typedef struct st_ha_create_information
{
    CHARSET_INFO *table_charset, *default_table_charset;
    LEX_STRING connect_string;
    const char *comment,*password;
    const char *data_file_name, *index_file_name;
    const char *alias;
    ulonglong max_rows,min_rows;
    ulonglong auto_increment_value;
    ulong table_options;
    ulong avg_row_length;
    ulong raid_chunksize;
    ulong used_fields;
    SQL_LIST merge_list;
    enum db_type db_type;
    enum row_type row_type;
    uint null_bits;                       /* NULL bits at start of record */
    uint options;                         /* OR of HA_CREATE_ options */
    uint raid_type,raid_chunks;
    uint merge_insert_method;
    uint extra_size;                      /* length of extra data segment */
    bool table_existed;                /* 1 in create if table existed */
    bool frm_only;                        /* 1 if no ha_create_table() */
    bool varchar;                         /* 1 if table has a VARCHAR */
} HA_CREATE_INFO;
```
 * storage engine 이 파일 기반이라는 가정하에 `form`, `info`는 신경 쓰지 않아도 됨.
 * csv engine 같은 경우 아래와 같이 구현되어 있음
  
```
int ha_tina::create(const char *name, TABLE *table_arg,
  HA_CREATE_INFO *create_info)
{
    char name_buff[FN_REFLEN];
    File create_file;
    DBUG_ENTER("ha_tina::create");

    if ((create_file= my_create(fn_format(name_buff, name, "", ".CSV",
          MY_REPLACE_EXT|MY_UNPACK_FILENAME),0,
          O_RDWR | O_TRUNC,MYF(MY_WME))) < 0)
    DBUG_RETURN(-1);

    my_close(create_file,MYF(0));

    DBUG_RETURN(0);
}
```

 * 흐음.... 딱히 예제 코드에서 수정할게 없어보여서 거의 그대로 가져왔다.
 * 변경한 부분은 확장자 부분이랑, ccls에서 warning을 뱉길레 if문 안에 assignment구문을 넣지 않고 밖으로 뺴기만 했다.
 * 그리고 원래 example source에 thread variable 을 설정하는 예시로 현재 사용하고 있는 Thread(아마도 내 추측으로는 client의 connection과 동일한 맥락을 가질듯, server에서는 connection 당 1개의 thread가 붙어서 담당한다고 알고 있음, 이건 위에 Overview 참고)마다 생성시킨 Table 개수를 tracking 하는 코드가 있었는데, 굳이 문제가 안될것 같아서 냅뒀다.

### 23.9 Opening a Table
 * read나 write 연산 전에 반드시 table data와 index file(있다면)을 열도록 되어있다.
  
```cpp
int open(const char *name, int mode, int test_if_locked);
```

 * `name`은 table 의 이름
 * `mode`는 `O_RDONLY`(Open read only) 또는 `O_RDWR`(Open read/write)
 * `test_if_locked`는 파일을 열 때 확인해야할 내용에 대한 값이고,
  
```cpp
#define HA_OPEN_ABORT_IF_LOCKED   0   /* default */
#define HA_OPEN_WAIT_IF_LOCKED    1
#define HA_OPEN_IGNORE_IF_LOCKED  2
#define HA_OPEN_TMP_TABLE         4   /* Table is a temp table */
#define HA_OPEN_DELAY_KEY_WRITE   8   /* Don't update index */
#define HA_OPEN_ABORT_IF_CRASHED  16
#define HA_OPEN_FOR_REPAIR        32  /* open even if crashed */
``` 
 * 이 값들중 하나이다.
 * lock을 어떻게 다루는지 같은건 `get_share()`와 `free_share()`를 참조하라고 한다.

#### 코드 보면서 느낀거
 * `handler::ha_open` 이라는 메서드가 존재하는데 얘가 `handler::open`을 호출하는 구조이다. (정확히 여기서는 `handler`를 상속받은 custom storage engine의 open이라는 메서드)
 * csv 의 `ha_tina`를 보면 (물론 여기서는 싱글톤? share를 활용해서 파일을 여는 구조인것 같다.) `mysql_file_open` 이라는 메서드를 사용해서 처리하는데, 여기서 받는 첫번째 인자가 `PSI_file_key`인데 이게 먼지 모르겠다. 참조 3에 있는 홈페이지에서 검색해서 찾아보면, 계측된? (instrumented) 파일 이라고 하는데.... 아예 innobase에서는 `mysql_file_open` 이라는 걸 사용하지도 않는다. csv에서도 static하게 선언해놓고 그냥 사용한다. 자동으로 채워지는 데이터 구조인지 잘모르겠다.
 * 흐음... 찾아보았는데 file을 생성할 때 PSI_file_key를 같이 주고서 생성하면 넣어주는 방식인듯. 내가 구현할 때는 `my_create`를 사용해서 생성했으니까, 그냥 `my_open`으로 파일을 열어서 사용하면 될 듯. 사용하는 곳들을 보니까 전부 singleton 이거나 metadata 임.

 * dictionary file 은 singleton (`handlerton`) 에서 vector 의 형식으로 관리하고, data file 은 handler 들이 각자 가지도록 구현해놔야할듯. open 이라는 메서드 자체가 테이블을 열어야할 필요가 있을 때만 열린다고 하니까 dictionary 가 안열릴 수 도 있다는 가정 하에 코딩해야된다.
 * handlerton 의 lifecycle 을 확인해서 handlerton 이 죽을 때(아마도 예측은 mysql server 가 죽을 때) 들고 있는 dictionary file을 해제하는 형식으로 해줘야 할듯.
 * 일단 indirect data 구조로 짜서 dictionary 에는 data file 의 page number 와 page 의 offset을 들고 있도록 구현하자.... 흐음... 이렇게 짜면 innodb랑 엄청 비슷한거 같은데? 흥... 근데 이것 보다 좋은 방식이 따로 떠오르지는 않는데? 일단 생각한대로 해보자.(innodb 보다 성능이 잘나올지는 모르겠다. 흐음...)

### 23.10 Implementing Basic Table Scanning
#### 23.10.1 Implementing the store_lock() Method
 * reading이나 writing 이 발생하기 전에 언제나 불림
 * table에 lock을 추가하기 전에 `mysqld`라는 lock handler가 요청된 locks을 store_lock을 호출한다. 이때 store lock은 lock 의 수준을 변경할수 있고(blocking을 non-blocking을 만들다던가, 아예 무시하도록 만들다던가) 아니면 다른 테이블들에 락을 추가할수도 있다.
 * lock을 풀어줄때 store_lock이 다시 불리게 되는데, 이런 경우에는 일반적으로는 아무것도 할 필요가 없다.
 
 * 만약 store_lock에 TL_IGNORE가 파라메터로 들어온다면, mysql에 handler에게 마지막에 요청했던 락을 다시 요청하는 것과 같다.
 * lock의 종류는 `includes/thr_lock.h`에 기재되어 있고 밑에 나와있는 것과 동일하다.

 ```cpp
 enum thr_lock_type
{
  TL_IGNORE=-1,
  TL_UNLOCK,                  /* UNLOCK ANY LOCK */
  TL_READ,                    /* Read lock */
  TL_READ_WITH_SHARED_LOCKS,
  TL_READ_HIGH_PRIORITY,      /* High prior. than TL_WRITE. Allow concurrent insert */
  TL_READ_NO_INSERT,          /* READ, Don't allow concurrent insert */
  TL_WRITE_ALLOW_WRITE,       /*   Write lock, but allow other threads to read / write. */
  TL_WRITE_ALLOW_READ,        /* Write lock, but allow other threads to read / write. */
  TL_WRITE_CONCURRENT_INSERT, /* WRITE lock used by concurrent insert. */
  TL_WRITE_DELAYED,           /* Write used by INSERT DELAYED.  Allows READ locks */
  TL_WRITE_LOW_PRIORITY,      /* WRITE lock that has lower priority than TL_READ */
  TL_WRITE,                   /* Normal WRITE lock */
  TL_WRITE_ONLY               /* Abort new lock request with an error */
};
 ```
 
 * `ha_myisammrg::store_lock()`을 참조

#### 23.10.2 Implementing the external_lock() Method
 * statement 의 시작이나, `LOCK TABLES` 라는 게 들어오면 `external_lock()`이 호출된다.
 * `external_lock()`은 ha_innodb.cc에서 찾아보면 된다. 대부분의 storage engine이 간단하게 return 0 하는 식으로 구현한다.
 
#### 23.10.3 Implementing the rnd_init() Method
 * `rnd_init()`은 table scan 을 준비하는 단계에서 호출되고, counters를 초기화 시키거나, pointers를 table의 시작지점에 만든다.
 * 간단한 CSV storage engine의 구현 예시이다.
  
```cpp
int ha_tina::rnd_init(bool scan)
{
      DBUG_ENTER("ha_tina::rnd_init");

      current_position= next_position= 0;
      records= 0;
      chain_ptr= chain;

      DBUG_RETURN(0);
}
```
 * 만약 sequential read면 `scan`은 `true`, random read 면 `false`이다.
  
#### 23.10.4 Implementing the info(uinf flag) Method
 * table scan을 하기 전에 optimizer에게 추가적인 테이블 정보를 넘겨주기 위해서 불린다.
 * return 값으로 정보를 전달하는 식이아니라 handler class의 몇몇 맴버 변수를 통해서 가져간다.
 * optimizer가 사용하는 것 이외에도 `SHOW TABLE STATUS`에서도 내용을 보게 된다. 이때 `flag` 인자는 어떠한 맥락에서 이 메서드가 호출되었는지를 전달해준다.
   * `HA_STATUS_NO_LOCK` : table shared의 lock을 방지할수 있다면, handler가 오래된걸 사용한다. (직역해서 좀 이상한데, lock 없이 가능하다면 오래된 버전을 본다. 아 풀어서 써도 이상하네... mvcc 같은 개념을 생각하면 될듯)
   * `HA_STATUS_TIME` : 오직 `stats->update_time`만 필요하다. (나머진 업데이터 안해도 된다.)
   * `HA_STATUS_CONST` : immutable member를 업데이트 해라 (`max-data_file_length`, `max_index_file_length`, `create_time`, `sortkey`, `ref_length`, `block_size`, `data_file_name`, `index_file_name`)
   * `HA_STATUS_VARIABLE` : `records`, `deleted`, `data_file_length`, `index_file_length`, `delete_length`, `check_time`, `mean_rec_length`
   * `HA_STATUS_ERRKEY` : 마지막으로 발생한 error key
   * `HASTATUS_AUTO` : autoincrement value 를 업데이트 해라.

 * 아래는 `sql/handler.h`에 정의되어 있는 public properties

```cpp
ulonglong data_file_length;      /* Length off data file */
ulonglong max_data_file_length;  /* Length off data file */
ulonglong index_file_length;
ulonglong max_index_file_length;
ulonglong delete_length;         /* Free bytes */
ulonglong auto_increment_value;
ha_rows records;                 /* Records in table */
ha_rows deleted;                 /* Deleted records */
ulong raid_chunksize;
ulong mean_rec_length;           /* physical reclength */
time_t create_time;              /* When table was created */
time_t check_time;
time_t update_time;
```

 * table scan의 목적에선, 가장 중요한 property는 records (table의 records 개수) 이다. 0, 1, 2보다 많음에 대한 정보가 중요하게 쓰인다. 2보다 많으면 더 많은건 따로 신경 안써도 된다.

* 아래는 `ha_tina` 의 예제이다.
```cpp
int ha_tina::info(uint flag)
 {
   DBUG_ENTER("ha_tina::info");
   /* This is a lie, but you don't want the optimizer to see zero or 1 */
   if (!records_is_known && stats.records < 2) 
     stats.records= 2;
   DBUG_RETURN(0); 
 }
```

#### 23.10.5 Implementing the extra() method
 * 추가적인 hint 를 주기 위해서 호출되는 method
 * extra call 을 구현하는건 의무가 아니여서 대부분 0을 리턴함
   * 너무 설명이 없다. 어떤 상황에서 추가적인 hint가 필요한지, parameter 가 왜 `int ha_tina::extra(enum ha_extra_function operation)` 이런식으로 구성되어 있는지에 대한 설명이 부족한듯.
    
#### 23.10.6 Implementing the rnd_next() method
 * 각 row를 가져올때마다 호출되며, server의 search condition 이 만족되었거나 파일의 끝에 도달하면 `HA_ERR_END_OF_FILE` 을 리턴해야한다.
 * `rnd_next()` 는 byte array 인 `buf`를 인자로 받는다. 이때 buf 는 반드시 mysql 의 table row 의 포멧을 따라야한다.
   * 3가지 포멧을 지원하는데, fixed-length rows, variable-length rows, variable-length rows with BLOB pointers 이다.
   * 모두 `CREATE TABLE` 의 순서를 따라야한다. (table의 정의는 `.frm` 에 있으며, optimizer와 handler 에서 최적화 할 수 있다.)
   * 각 format 마다 nullable column 마다 1bit의 NULL bitmaps 으로 시작한다. (만약 8개의 Nullable Column 이 존재한다면, 1byte 의 bitmap 이 존재할거다.)
   * 딱 하나 예외가 있는데, fixed-width table인데, 이때는 추가 시작 bit가 있으므로 8개의 Nullable columns 을 가지고 있는 table은 2bytes bitmap 이 존재한다.
   * Nullbitmap 구역이 끝나면, Columns의 datatypes가 있다. datatype 에 대한 정의는 `sql/field.cc` 에 정의 되어 있다.
   * fixed length row format 에서는 간단하게 하나 다음 하나 형식으로 존재한다. variable length row에서는 VARCHAR는 1이나 2 bytes 길이로 부호화 되어 있다.
   * BLOB을 포함하는 variable length row 에서는 각 BLOB은 2부분으로 저장되는 데, 1번째는 BLOB의 크기를 저장하는 integer, 2번째는 BLOB의 내용에 대한 pointer 이다.
 * 다음은 csv 의 예시이다.

 ```cpp
 int ha_tina::rnd_next(byte *buf)
{
   DBUG_ENTER("ha_tina::rnd_next");

   statistic_increment(table->in_use->status_var.ha_read_rnd_next_count, &LOCK_status);

   current_position= next_position;
   if (!share->mapped_file)
     DBUG_RETURN(HA_ERR_END_OF_FILE);
   if (HA_ERR_END_OF_FILE == find_current_row(buf) )
     DBUG_RETURN(HA_ERR_END_OF_FILE);

   records++;
   DBUG_RETURN(0);
}
 ```

 ```cpp
 int ha_tina::find_current_row(byte *buf)
{
   byte *mapped_ptr= (byte *)share->mapped_file + current_position;
   byte *end_ptr;
   DBUG_ENTER("ha_tina::find_current_row");

   /* EOF should be counted as new line */
   if ((end_ptr=  find_eoln(share->mapped_file, current_position,
                            share->file_stat.st_size)) == 0)
     DBUG_RETURN(HA_ERR_END_OF_FILE);

   for (Field **field=table->field ; *field ; field++)
   {
     buffer.length(0);
     mapped_ptr++; // Increment past the first quote
     for(;mapped_ptr != end_ptr; mapped_ptr++)
     {
       // Need to convert line feeds!
       if (*mapped_ptr == '"' &&
           (((mapped_ptr[1] == ',') && (mapped_ptr[2] == '"')) ||
            (mapped_ptr == end_ptr -1 )))
       {
         mapped_ptr += Move past the , and the "
         break;
       }
       if (*mapped_ptr == '\\' && mapped_ptr != (end_ptr - 1))
       {
         mapped_ptr++;
         if (*mapped_ptr == 'r')
           buffer.append('\r');
         else if (*mapped_ptr == 'n' )
           buffer.append('\n');
         else if ((*mapped_ptr == '\\') || (*mapped_ptr == '"'))
           buffer.append(*mapped_ptr);
         else  /* This could only happed with an externally created file */
         {
           buffer.append('\\');
           buffer.append(*mapped_ptr);
         }
       }
       else
         buffer.append(*mapped_ptr);
     }
     (*field)->store(buffer.ptr(), buffer.length(), system_charset_info);
   }
   next_position= (end_ptr - share->mapped_file)+1;
   /* Maybe use \N for null? */
   memset(buf, 0, table->s->null_bytes); /* We do not implement nulls! */

   DBUG_RETURN(0);
}
 ```
