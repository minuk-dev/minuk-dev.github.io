---
layout  : wiki
title   : mysql
summary : 
date    : 2020-05-28 07:48:47 +0900
lastmod : 2020-05-28 15:16:44 +0900
tags    : 
draft   : false
parent  : 
---

# 참고용 홈페이지 
 1. https://dev.mysql.com/doc/internals/en/custom-engine.html
 * 

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

## 참고용 홈페이지 읽고 정리하기
### 23.2 Overview
 * `handler`라는 interface를 구현하도록 되어 있는데, 각 connection 마다 thread가 생성되고 각 thread마다 handler instance를 생성하고 가지고 있도록 한다.
   *  질문점 : 그러면 각 handler들이 같은 table에 접근하게 되면 어떻게 되나 : handler를 구현할때 알아서 해결해야 한다. 가장 단순한 해결법은 table마다 lock을 가지게 해서 동시에 handler들이 접근 못하도록 하는것. (생각해보면 read lock, write lock마다 구현법도 다양하고 mvcc같은거 고려하면 생각할게 너무 많을 텐데 당연하게도 storage engine이 알아서 처리하도록 하는게 맞다)
 * read-only -> insert, update, delete -> indexing, transactions -> other advanced options 순서로 구현하라고 한다.
### 23.3 Creating Storage Engine Source Files
 * `example` 을 복사해서 수정하는게 제일 단순하다 (사실 이렇게 공식 홈페이지 적어놓을만 한게, innobase(=innodb)코드를 보고 비슷하게 만들어보려고 시도했는데, 나에게는 이건 너무 어려웠다. ㅠ)
### 23.4 Adding Engine Specific Variables and Parameters
 * 구조가 Plugin 식으로 추가되는 식인것 같은데 그래서 Plugin 을 만드는 방법에 대해서 나와있다.
 * 이걸 열심히 공부하는것도 맞지만, 조금 목표와 멀어질 것 같아서 일단은 innobase 꺼 CMakeLists.txt 를 참고했고, 나중에 필요하면 다시 보면 될거라고 생각한다.
### 23.4 Creating the handlerton
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

