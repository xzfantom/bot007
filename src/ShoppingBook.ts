class ShoppingItem {
    name:string
    isBought:boolean

    constructor(name:string, isBought = false) {
        this.name = name
        this.isBought = isBought
    }
}

class ShoppingList {
    list:Array<ShoppingItem>

    constructor() {
        this.list = new Array
    }

    addToList(name:string){
        this.list.push(new ShoppingItem(name))
    }

    markBought(name:string){
        let pos = this.list.find(element => element.name.toLowerCase().includes(name.toLowerCase()))
        if (pos != undefined){
            pos.isBought = true
        }
    }

    markUnBought(name:string){
        let pos = this.list.find(element => element.name.toLowerCase().includes(name.toLowerCase()))
        if (pos != undefined){
            pos.isBought = false
        } 
    }

    removeItem(name:string){
        let pos = this.list.findIndex(element => element.name.toLowerCase().includes(name.toLowerCase()))
        if (pos != undefined){
            this.list.splice(pos)
        }
    }

    getAllItems() {
        let result:string[] = new Array
        this.list.forEach(item => result.push(((item.isBought)?'[x]':'[_]') + item.name))
        return result.join('\n')
    }
}

class ShoppingBook {
    account:Map<number, ShoppingList>
  
    constructor() {
      this.account = new Map
    }
  
    addToList(id:number, item:string){
      if (!this.account.has(id)){
        let arr = new ShoppingList()
        this.account.set(id, arr)
      }
      this.account.get(id)?.addToList(item)
    }
  
    getItems(id:number){
        return this.account.get(id)?.getAllItems() || ""
    }

    removeItem(id:number, item:string){
        if (this.account.has(id)){
            this.account.get(id)?.markBought(item)       
        }
    }
  }

export { ShoppingBook }