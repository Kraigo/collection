import test from 'ava';
import { first, firstValueFrom } from 'rxjs';

import app from '../example/app';

app.init();

test('init values', async t => {
    const items = await firstValueFrom(app.store.items$);
    t.is(items.length, 0);
});

test('append', async t => {
    const item = {
        id: 1,
        name: 'Test 1'
    };

    app.effect.appendItems([item])
    const items = await firstValueFrom(app.store.items$);
    t.is(items.length, 1);
    t.true(items[0].id === item.id);
});

test('update', async t => {
    const item = {
        id: 1,
        name: 'Test 1 (new)'
    };
    
    app.effect.updateOne(item)
    const items = await firstValueFrom(app.store.items$);
    t.is(items.length, 1);
    t.true(items[0].id === item.id);
    t.true(items[0].name === item.name);
});

test('order', async t => {
    app.effect.appendItems([{
        id: 2,
        name: 'Test 2'
    },{
        id: 3,
        name: 'Test 3'
    }])
    const items = await firstValueFrom(app.store.items$);

    for (let [i, id] of [1,2,3].entries()) {
        t.true(items[i].id === id);
    }
});

test('order after update', async t => {
    app.effect.updateOne({
        id: 2,
        name: 'Test 2 (update)'
    });

    const items = await firstValueFrom(app.store.items$);

    for (let [i, id] of [1,2,3].entries()) {
        t.true(items[i].id === id);
    }
});