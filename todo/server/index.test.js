
/* eslint-disable jest/valid-expect */
import { expect } from "chai";

import { initializeTestDb } from "./helper/test.js";
//const base_URL = 'http://localhost:3001'; 

describe('GET Tasks', () => {

    before(async () => {
        await initializeTestDb();
    });



    it ('should return all tasks', async () => {
        const response = await fetch('http://localhost:3001/');
        const data = await response.json();

        /* eslint-disable jest/valid-expect */
        expect(response.status).to.equal(200);
        /* eslint-disable jest/valid-expect */
        expect(data).to.be.an('array').that.is.not.empty;
        /* eslint-disable jest/valid-expect */
        expect(data[0]).to.include.all.keys('id', 'description');
    });
});

describe ('POST Task', () => {
    it('should post a task', async () => {
        const response = await fetch('http://localhost:3001/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: 'Task from unit test' }),
        });

        const data = await response.json();
       
        expect(response.status).to.equal(201);
        
        expect(data).to.be.an('object')
      
        expect(data).to.include.all.keys('id');
    })

    it ('should not post a task without description', async () => {
        const response = await fetch('http://localhost:3001/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({description: null}),
        });

        const data = await response.json();
        expect(response.status).to.equal(500);
        expect(data).to.be.an('object');
        expect(data).to.include.all.keys('error');
    })

});


    describe('DELETE Task', () => {
        it('should delete a task', async () => {
            const response = await fetch('http://localhost:3001/delete/1', {
                method: 'DELETE',
            });
            const data = await response.json();
            expect(response.status).to.equal(200);
            expect(data).to.be.an('object');
            expect(data).to.include.all.keys('id');
        })

        it ('should not delete a task with sql injection', async () => {
            const  response = await fetch('http://localhost:3001/delete/id=0orid>0', {
                method: 'DELETE',
            });
            const data = await response.json();
            expect(response.status).to.equal(500);
            expect(data).to.be.an('object');
            expect(data).to.include.all.keys('error');
    })
});

describe('POST User', () => {
        const email = 'register@foo.com';
        const password = 'register123';
        it('should register with a valid email and password', async () => {
            const response = await fetch('http://localhost:3001/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            expect(response.status).to.equal(201, data.error);
            expect(data).to.be.an('object');
            expect(data).to.include.all.keys('id', 'email');
        })
});