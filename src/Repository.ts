export class Repository<T extends { id: number }> {

    // private items: T[] = [];
    private items: Map<number, T> = new Map();

    saveItem(item: T) {
        // const idx = this.items.findIndex(i => i.id === item.id)
        // if (idx >= 0) {
        //     this.items[idx] = item;
        // } else {
        //     this.items.push(item);
        // }

        this.items.set(item.id, item);

    }

    findById(id: number): T | undefined {
        return this.items.get(id)
        // return this.items.find(i => i.id === id);
    }

    findAll(): T[] {
        return Array.from(this.items.values());
    }

    deleteById(id: number): boolean {
        // const index = this.items.findIndex(i => i.id === id);

        // if (index >= 0) {
        //     this.items.splice(index, 1);
        //     return true;
        // }

        // return false;

        return this.items.delete(id);
    }
}


