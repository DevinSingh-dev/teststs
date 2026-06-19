import { v9 } from "../../Vein.js/init.js";

class stream_class {
    static fdt(module, action, spread, path, ...params){
        let normalized = v9.utilities.normalize_path(...path);

        for (let i = 0; i < normalized.length; i++) {
            let next = module.vget(normalized.slice(0, i + 1));
            if (next instanceof v9.module) {
                return stream_class.fdt(next, action, spread, normalized.slice(i + 1), ...params);
            }
        }
        return spread
            ? module[action](...normalized, ...params)
            : module[action](normalized, ...params);
    }
    static t(module, action, path, ...params){
        return stream_class.fdt(module, action, true, path, ...params);
    }
    static ta(module, action, path, ...params){
        return stream_class.fdt(module, action, false, path, ...params);
    }
    static tset(module, ...path){
        let val = path.pop();
        return stream_class.t(module, "set", path, val);
    }
    static tget(module, ...path){
        return stream_class.t(module, "get", path);
    }
    static tdel(module, ...path){
        return stream_class.t(module, "del", path);
    }
    static extends(base = v9.module){
        return class extends base {
            tset(...path){
                return stream_class.tset(this, ...path);
            }
            tdel(...path){
                return stream_class.tdel(this, ...path);
            }
            tget(...path){
                return stream_class.tget(this, ...path);
            }
            t(action, path, ...params){
                return stream_class.t(this, action, path, ...params);
            }
            ta(action, path, ...params){
                return stream_class.ta(this, action, path, ...params);
            }
        }
    }
}

stream_class.module = stream_class.extends();
v9.establish(stream_class, "stream");