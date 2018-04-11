/**
 * Created by 延松松松松 on 2018/4/8.
 */
window.onload=function () {
    var vm = new  Vue({
        el:"#main_body",
        data:{
            all_songs:[
                {name:"Counting Stars",author:"筷子兄弟1"},
                {name:"Love Yourself",author:"筷子兄弟2"},
                {name:"What Are Words",author:"筷子兄弟3"},
                {name:"红玫瑰",author:"陈奕迅"}

            ],
            like_songs:[],
            recent_songs:[]
        },
        methods:{
            add:function () {
                // console.log(event.target);
                console.log("这是第"+event.target.getAttribute("keyui")+"个按钮");
                //console.log(event.target.getAttribute("state_choose"));
                var ind = event.target.getAttribute("keyui");                   //获取这是第几个小心心
                var hearts = document.getElementsByClassName("small_heart");   //获取小心心的类
                var state_choose = event.target.getAttribute("state_choose");  //获取当前心是点亮还是没点亮  点亮：1  没点亮：0
            //    这个keyui是自定义属性
                if(state_choose==1){
                    event.target.setAttribute("state_choose","0");
                    hearts[ind].classList.remove("glyphicon-heart");
                    hearts[ind].classList.add("glyphicon-heart-empty");
                    hearts[ind].style.color = "";

                    //console.log("删除前的length为"+vm.like_songs.length)
                    Array.prototype.indexOf = function(val) {
                        for (var i = 0; i < this.length; i++) {
                            if (this[i] == val) return i;
                        }
                        return -1;
                    };
                    Array.prototype.remove = function(val) {
                        var index = this.indexOf(val);
                        if (index > -1) {
                            this.splice(index, 1);
                            console.log(this.length)
                        }
                    };
                    vm.like_songs.remove(vm.all_songs[ind]);

                }else {
                    event.target.setAttribute("state_choose","1");
                    hearts[ind].classList.remove("glyphicon-heart-empty");
                    hearts[ind].classList.add("glyphicon-heart");
                    hearts[ind].style.color = "rgb(255, 42, 0)";
                    vm.like_songs.push(vm.all_songs[ind]);
                }
            },
        }
    });



};
