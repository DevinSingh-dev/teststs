import { v9 } from "../../Vein.js/init.js";

class array_class {
    static push(module, ...path){
        let [val] = path.pop();
        let new_array = [...(module.get(...path) || []), val]
        module.set(...path, new_array);
        return new_array;
    }
    static pop(module, ...path){
        const arr = [...(module.get(...path) || [])];
        const val = arr.pop();
        module.set(...path, arr);
        return val;
    }
    static filter(module, ...path){
        let [fn] = path.pop();
        let new_array = (module.get(...path) || []).filter(fn);
        module.set(...path, new_array);
        return new_array;
    }
    static shift(module, ...path){
        const arr = [...(module.get(...path) || [])];
        const val = arr.shift();
        module.set(...path, arr);
        return val;
    }
    static unshift(module, ...path){
        let [val] = path.pop();
        let new_array = [val, ...(module.get(...path) || [])];
        module.set(...path, new_array);
        return new_array;
    }
    static splice(module, ...path){
        let [start, deleteCount, ...items] = path.pop();
        const arr = [...(module.get(...path) || [])];
        const removed = arr.splice(start, deleteCount, ...items);
        module.set(...path, arr);
        return removed;
    }
    static map(module, ...path){
        let [fn] = path.pop();
        let new_array = (module.get(...path) || []).map(fn);
        module.set(...path, new_array);
        return new_array;
    }
    static find(module, ...path){
        let [fn] = path.pop()
        return (module.get(...path) || []).find(fn);
    }
    static findIndex(module, ...path){
        let [fn] = path.pop();
        return (module.get(...path) || []).findIndex(fn);
    }
    static includes(module, ...path){
        let [val] = path.pop();
        return (module.get(...path) || []).includes(val);
    }
    static sort(module, ...path){
        let [fn] = path.pop();
        let new_array = [...(module.get(...path) || [])].sort(fn);
        module.set(...path, new_array);
        return new_array;
    }
    static slice(module, ...path){
        let [start, end] = path.pop();
        return (module.get(...path) || []).slice(start, end);
    }
    static length(module, ...path){
        return (module.get(...path) || []).length;
    }
    static clear(module, ...path){
        module.set(...path, []);
        return [];
    }
    static extends(base = v9.module) {
        return class extends base {
            push(...path) {
                return array_class.push(this, ...path);
            }
            pop(...path) {
                return array_class.pop(this, ...path);
            }
            filter(...path) {
                return array_class.filter(this, ...path);
            }
            shift(...path) {
                return array_class.shift(this, ...path);
            }
            unshift(...path) {
                return array_class.unshift(this, ...path);
            }
            splice(...path) {
                return array_class.splice(this, ...path);
            }
            map(...path) {
                return array_class.map(this, ...path);
            }
            find(...path) {
                return array_class.find(this, ...path);
            }
            findIndex(...path) {
                return array_class.findIndex(this, ...path);
            }
            includes(...path) {
                return array_class.includes(this, ...path);
            }
            sort(...path) {
                return array_class.sort(this, ...path);
            }
            slice(...path) {
                return array_class.slice(this, ...path);
            }
            length(...path) {
                return array_class.length(this, ...path);
            }
            clear(...path) {
                return array_class.clear(this, ...path);
            }
        }
    }
}

array_class.module = array_class.extends();
v9.establish(array_class, "arrays");