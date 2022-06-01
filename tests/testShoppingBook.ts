import { ShoppingBook } from '../src/ShoppingBook'; // this will be your custom import
import { expect } from 'chai';

describe('ShoppingBook tests', () => { // the tests container
    it('checking base things', () => { // the single test
        let id = 1        
        const shoppingBook = new ShoppingBook()
        
        expect(shoppingBook.getItems(id)).to.be.empty
        
    })

    it('simple walkthrough', () => {
        let id = 1
        const shoppingBook = new ShoppingBook

        shoppingBook.addToList(id, 'first')
        shoppingBook.addToList(id, 'second')
        shoppingBook.addToList(id, 'third')

        let items = shoppingBook.getItems(id);
        expect(items).to.include('[_]first')
        expect(items).to.include('[_]second')
        expect(items).to.include('[_]third')

        shoppingBook.removeItem(id, 'second')
        items = shoppingBook.getItems(id);
        expect(items).to.include('[_]first')
        expect(items).to.include('[x]second')
        expect(items).to.include('[_]third')
    })
});
