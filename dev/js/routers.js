import { setWechatTitle }  from './utils/setWechatTitle.js'
export default function (Vue, router){
    router.map({

        '/':{
            name:'root',
            component: function(resolve){
                require(['./views/app.vue'], resolve)
            },
            subRoutes:{

                // 欢迎页
                '/home':{
                    name:'home',
                    title: '首页',
                    component: function(resolve){
                        require(['./views/home/index.vue'], (res) => {
                            resolve(res)
                        })
                    }
                },
                // 模糊搜索
                '/fuzzy-search': {
                    name: 'fuzzy-search',
                    title: '模糊搜索',
                    component: function(resolve){
                        require(['./views/fuzzy-search/test_fuzzysearch.vue'], (res) => {
                            resolve(res)
                        })
                    }
                }
            }
        }
    })


    router.beforeEach(transition => {
        if(transition.to.name == 'root') {
            router.go({ name: 'home'})
        }
        transition.next()
    })

    router.afterEach(transition => {
        let title = transition.to.title + ' - Jnathan'
        setWechatTitle(title)
    })
    
}