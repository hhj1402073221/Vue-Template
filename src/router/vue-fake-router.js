// vue-router 模拟
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

VueRouter.install = function(Vue){

    // TODO
    Vue.mixin({
        beforeCreate() {
            if(this.$options.router){
                this.$options.router.init(this);
            }
        }
    })

    // 自定义 router-view
    Vue.component('router-view', {
        functional: true,
        render(createElement, { props, children, parent, data}) {
            const router = parent.$options.router;
            const path = router.path;
            const matchRouter = router.routers.find( router => {
                return router.path.replace(/^\//, '') === path.replace(/^#\//, '');
            });
            const matchComponent = matchRouter.component;
            // 重新刷新要变换组件
            let comp = {
                tamplate: '<div>我是router-view</div>'
            }
            return createElement(
                matchComponent
            )
        }
    });
}