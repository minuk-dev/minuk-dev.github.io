---
layout  : wiki
title   : Jest
summary : 
date    : 2020-04-07 20:32:13 +0900
lastmod : 2020-04-08 12:51:30 +0900
tags    : 
toc     : true
public  : true
parent  : 
latex   : false
---

# # Installation

    yarn add --dev jest
    npm install --dev jest
    
    yarn add --dev @types/jest
    npm install --dev @types/jest

# Configuration

    "scripts": {
    	"test": "jest"
    }, 

## Write test code

    test(`test name`, () => {
    	expect(1).toBe(1);
    });

## Test Matcher

### toEqual()

    test('return a user object', () => {
    	expect(getUser(1)).toEqual({
    		id: 1,
    		email: 'user1@test.com'
    	});
    });

### toBeTruthy(), toBeFalsy()

    test('number 0 is falsy but string 0 is truthy', () => {
    	expect(0).toBeFalsy();
    	expect('0').toBeTruthy();
    });

### toHaveLength(), toContain()

    test('array', () => {
    	const coloers = ['Red', 'Yellow', 'Blue'];
    	expect(colors).toHaveLength(3);
    	expect(colors).toContain('Yellow');
    	expect(colors).not.toContain('Green');
    });

### toMatch()

    test('string', ()=> {
    	expect(getUser(1).email).toBe('user1@test.com');
    	expect(getUser(2).email).toMatch(/.*test.com$/);
    });

### toThrow()

    function getUser(id) {
    	if (id <= 0) throw new Error('Invalid ID');
    	return {
    		id,
    		meail: `user${id}@test.com`
    	};
    }

    test('throw when id is non negative', () => {
      expect(() => getUser(-1).toThrow());
      expect(() => getUser(-1).toThrow('Invalid ID'));
    });

[An Async Example · Jest](https://jestjs.io/docs/en/tutorial-async)

## Async Example

### .resolves

    it('works with resolves', )_ => {
    	expect.assrtions(1);
    	return expect(user.getUserName(5)).resolves.toEqual('Paul');
    });

### async / await

    it('works with async/awit', async () => {
    	expect.assertions(1);
    	const data = await user.getUserName(4);
    	expect(data).toEqual('Mark');
    });
    
    it('works with aysnc/await and resolves', aysnc() => {
    	expect.assertions(1);
    	await expect(user.getUserName(5)).resolves.toEqual('Paul');
    });

## Error handling

### .rejects

    // Testing for async errors using Promise.catch.
    test('tests error with promises', () => {
      expect.assertions(1);
      return user.getUserName(2).catch(e =>
        expect(e).toEqual({
          error: 'User with 2 not found.',
        }),
      );
    });
    
    // Or using async/await.
    it('tests error with async/await', async () => {
      expect.assertions(1);
      try {
        await user.getUserName(1);
      } catch (e) {
        expect(e).toEqual({
          error: 'User with 1 not found.',
        });
      }
    });

### .rejects

    // Testing for async errors using `.rejects`.
    it('tests error with rejects', () => {
      expect.assertions(1);
      return expect(user.getUserName(3)).rejects.toEqual({
        error: 'User with 3 not found.',
      });
    });
    
    // Or using async/await with `.rejects`.
    it('tests error with async/await and rejects', async () => {
      expect.assertions(1);
      await expect(user.getUserName(3)).rejects.toEqual({
        error: 'User with 3 not found.',
      });
    });
