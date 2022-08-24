class ContenedorMemoria {
    constructor() {
        this.items = []
    }


    list(id) {
        let itemFinder = this.items.find(i => i.id ===id)
        return itemFinder
    }

    listAll() {
        return this.items
    }

    save(item) {
        if (this.items.length > 0) {
            let newItem = this.items[this.items.length - 1].id + 1
            item.id = newItem
            this.items.push(item)
        } else {
            item.id = 1
            this.items.push(item)
        }
    }

    update(item, id) {
        let itemUpdate = this.items.find(i => i.id === id)
        if (itemUpdate) {
            this.items[itemUpdate].title = item.title
            this.items[itemUpdate].price = item.price
            this.items[itemUpdate].thumbnail = item.thumbnail
        } else {
            return {error: 'Item imposible de encontrar.'}
        }
    }

    delete(id) {
        let itemDelete = this.items.find(i => i.id === id)
        this.items.splice(itemDelete, 1)
    }

    deleteAll() {
        return this.items.splice(0, this.items.length)
    }
}

module.exports = ContenedorMemoria;
