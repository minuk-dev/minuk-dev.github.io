---
layout  : wiki
title   : 
summary : 
date    : 2020-04-07 20:31:57 +0900
lastmod : 2020-04-07 20:31:59 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

# # Installation

    npm install --save sequelize
    
    # One of the following
    npm install --save pg pg-hstore # Postgres
    npm install -save mysql2 # mysql
    npm install --save mariadb # mariadb
    npm install --save sqlite3 # sqlite
    npm install --save tedious # Microsoft SQL Server

# Configuration (Typescript)

## Setting up a connection

    import { Sequelize } from 'sequelize';
    
    interface DBConfituration {
    	database: string;
    	user: string;
    	password: string;
    	host: string;
    	dialect: "mysql" | "postgres" | "sqlite" | "mariadb" | "msqle" | undefined;
    }
    
    const dbConfiguration : DBConfiguration = {
    	database: "graph",
    	user: "graph",
    	password: "graph",
    	host: "localhost",
    	dialect: "mysql"
    };
    
    const sequelize = new Sequelize(
    	dbConfiguration.database,
    	dbConfiguration.user,
    	dbConfiguration.password,
    	{
    		host: dbConfiguration.host,
    		dialect: dbConfgiguration.dialect,
    	},
    );

    const sequelize = new Sequelize('postgres://user:pass@example.con:5432/dbname');

## Note: connection pool (production)

    const sequelize = new Sequelize(/* ... */, {
    	// ...
    	pool: {
    		max: 5,
    		min: 0,
    		acquire: 30000,
    		idle: 10000,
    	}
    });

## Testing the connection

    sequelize
    	.authenticate()
    	.then(() => {
    		console.log('Connection has been established successfully.');
    	})
    	.catch(err => {
    		console.error('Unable to connect to the database:', err);
    });

- Sample Code (Typescript)

# Model usage

## Data retrieval / Finders

### find - Search for one specific element in the database

    // search for known ids
    Project.findByPk(123).then(project => {
      // project will be an instance of Project and stores the content of the table entry
      // with id 123. if such an entry is not defined you will get null
    })
    
    // search for attributes
    Project.findOne({ where: {title: 'aProject'} }).then(project => {
      // project will be the first entry of the Projects table with the title 'aProject' || null
    })
    
    
    Project.findOne({
      where: {title: 'aProject'},
      attributes: ['id', ['name', 'title']]
    }).then(project => {
      // project will be the first entry of the Projects table with the title 'aProject' || null
      // project.get('title') will contain the name of the project
    })

### findOrCreate - Search for a specific element or create it if not available

    User
      .findOrCreate({where: {username: 'sdepold'}, defaults: {job: 'Technical Lead JavaScript'}})
      .then(([user, created]) => {
        console.log(user.get({
          plain: true
        }))
        console.log(created)
    
        /*
         findOrCreate returns an array containing the object that was found or created and a boolean that
         will be true if a new object was created and false if not, like so:
    
        [ {
            username: 'sdepold',
            job: 'Technical Lead JavaScript',
            id: 1,
            createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
            updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
          },
          true ]
    
     In the example above, the array spread on line 3 divides the array into its 2 parts and passes them
      as arguments to the callback function defined beginning at line 39, which treats them as "user" and
      "created" in this case. (So "user" will be the object from index 0 of the returned array and
      "created" will equal "true".)
        */
      })
    
    User.create({ username: 'fnord', job: 'omnomnom' })
      .then(() => User.findOrCreate({where: {username: 'fnord'}, defaults: {job: 'something else'}}))
      .then(([user, created]) => {
        console.log(user.get({
          plain: true
        }))
        console.log(created)
    
        /*
        In this example, findOrCreate returns an array like this:
        [ {
            username: 'fnord',
            job: 'omnomnom',
            id: 2,
            createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
            updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
          },
          false
        ]
        The array returned by findOrCreate gets spread into its 2 parts by the array spread on line 3, and
        the parts will be passed as 2 arguments to the callback function beginning on line 69, which will
        then treat them as "user" and "created" in this case. (So "user" will be the object from index 0
        of the returned array and "created" will equal "false".)
        */
      })

### findAndCountAll - Search for multiple elements in the database, returns both data and total count

    Project
      .findAndCountAll({
         where: {
            title: {
              [Op.like]: 'foo%'
            }
         },
         offset: 10,
         limit: 2
      })
      .then(result => {
        console.log(result.count);
        console.log(result.rows);
      });
    
    User.findAndCountAll({
      include: [
         { model: Profile, required: true }
      ],
      limit: 3
    });
    
    User.findAndCountAll({
      include: [
         { model: Profile, where: { active: true }}
      ],
      limit: 3
    });

### findAll - Search for multiple elements in the database

    // find multiple entries
    Project.findAll().then(projects => {
      // projects will be an array of all Project instances
    })
    
    // search for specific attributes - hash usage
    Project.findAll({ where: { name: 'A Project' } }).then(projects => {
      // projects will be an array of Project instances with the specified name
    })
    
    // search within a specific range
    Project.findAll({ where: { id: [1,2,3] } }).then(projects => {
      // projects will be an array of Projects having the id 1, 2 or 3
      // this is actually doing an IN query
    })
    
    Project.findAll({
      where: {
        id: {
          [Op.and]: {a: 5},           // AND (a = 5)
          [Op.or]: [{a: 5}, {a: 6}],  // (a = 5 OR a = 6)
          [Op.gt]: 6,                // id > 6
          [Op.gte]: 6,               // id >= 6
          [Op.lt]: 10,               // id < 10
          [Op.lte]: 10,              // id <= 10
          [Op.ne]: 20,               // id != 20
          [Op.between]: [6, 10],     // BETWEEN 6 AND 10
          [Op.notBetween]: [11, 15], // NOT BETWEEN 11 AND 15
          [Op.in]: [1, 2],           // IN [1, 2]
          [Op.notIn]: [1, 2],        // NOT IN [1, 2]
          [Op.like]: '%hat',         // LIKE '%hat'
          [Op.notLike]: '%hat',       // NOT LIKE '%hat'
          [Op.iLike]: '%hat',         // ILIKE '%hat' (case insensitive)  (PG only)
          [Op.notILike]: '%hat',      // NOT ILIKE '%hat'  (PG only)
          [Op.overlap]: [1, 2],       // && [1, 2] (PG array overlap operator)
          [Op.contains]: [1, 2],      // @> [1, 2] (PG array contains operator)
          [Op.contained]: [1, 2],     // <@ [1, 2] (PG array contained by operator)
          [Op.any]: [2,3]            // ANY ARRAY[2, 3]::INTEGER (PG only)
        },
        status: {
          [Op.not]: false           // status NOT FALSE
        }
      }
    })

### Complex filtering / OR / NOT queries

    Project.findOne({
      where: {
        name: 'a project',
        [Op.or]: [
          { id: [1,2,3] },
          { id: { [Op.gt]: 10 } }
        ]
      }
    })
    
    Project.findOne({
      where: {
        name: 'a project',
        id: {
          [Op.or]: [
            [1,2,3],
            { [Op.gt]: 10 }
          ]
        }
      }
    })
