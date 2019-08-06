// vue-router 模拟（嵌套路由）
export default class VueRouter {
    constructor({ routers }){
        this.routers = routers;
        this.path = window.location.hash; // 初始化
        this.history = new History();
        this.history.listen( path => {
            this.path = path; // 初始化
            this.vm.$forceUpdate();
        });
    }

    init(vm) {
        this.vm = vm;
    }
}
class History {
    listen(callback) {
        window.addEventListener('hashchange', function(){
            console.log('hash-change', window.location.hash);
            callback && callback(window.location.hash);
        });
    }
}

function matcher(routers, path, index) {
    let paths = path.split('/');
    for(let routerName in routers){
        let router = routers[routerName];
        if(router.path.replace(/^\//, '') === path[index].replace(/^\//, '')){
            if(router.children) {
                let components = matcher(router.children, path, index + 1);
                if(components === false){
                    continue;
                }
                return [router.component, ...components];
            }else if(index >= paths.length - 1){
                return [router.component];
            }else{
                continue;
            }
        }
    }
}

function getMatchedComponent(routers, path, matchIndex){
    let matchRes = matcher(routers, path, 0);
    if(!matchRes) return null;
    return {
        ...matchRes[matchIndex - 1]
    };
}

VueRouter.install = function(Vue){

    // TODO
    Vue.mixin({
        beforeCreate() {
            if(this.$options.router){
                this.$options.router.init(this);
                this.routerRoot = true;
            }else {
                this.routerRoot = (this.$parent && this.$parent.routerRoot);
            }
        }
    })

    // 自定义 router-view
    Vue.component('router-view', {
        functional: true,
        render(createElement, { props, children, parent, data}) {
            
            parent.isRouterView = true;
            let depth = 1;
            let serachedParent = parent; 
            // 向上查找
            while(serachedParent
                && serachedParent.$parent
                && serachedParent.routerRoot != serachedParent){
                if(serachedParent.isRouterView){
                    depth++;
                }
                serachedParent = serachedParent.$parent;
            }
            
            const router = parent.$options.router;
            const path = router.path.replace(/^\//, '');
            
            const matchComponent = getMatchedComponent(router.routers, path, 1);
            
            return createElement(
                matchComponent
            )
        }
    });
}