/**
 * Created by 延松松松松 on 2018/4/8.
 */
window.onload=function () {
    var song_list_div =  document.getElementsByClassName("song_list");
    song_list_div[1].style.display = "none";
    song_list_div[2].style.display = "none";


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
            recent_songs:[],
            player:{},
            songindex:0,
            duration: "3.35",
            currentTime:"1:05"
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
                   //         console.log(this.length)
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
            play:function () {
                // console.log(event.target.getAttribute("numb"));
                var index = event.target.getAttribute("numb");
                this.player = document.getElementById("media");
                this.player.src = "mp3/"+vm.all_songs[index].name+".mp3";
                this.player.play();
                this.songindex = index;
                // console.log(this.songindex);
                event.target.setAttribute("state_Play","1");
                playIcon.classList.remove("glyphicon-play");
                playIcon.classList.add("glyphicon-pause");



                // this.duration  = this.player.duration
            //    下面是获取播放时间
                var b = this.player;
                //由于音乐需要加载 所以必须等到 canplay 才能获取到duration
                b.addEventListener("canplay",function () {
                    var bt = b.duration

                    vm.duration =Math.floor(bt/60)+":"+(bt%60/100).toFixed(2).slice(-2);
                    setInterval(function () {
                        var ct = b.currentTime;
                        vm.currentTime = Math.floor(ct/60)+":"+(ct%60/100).toFixed(2).slice(-2);
                        console.log(ct+","+vm.currentTime)
                    },1000)
                })

            },
            changePlayOrPause:function () {
                var state = event.target.getAttribute("state_Play");
                var playIcon = document.getElementById("playIcon");
                if (state==0){
                    event.target.setAttribute("state_Play","1");
                    playIcon.classList.remove("glyphicon-play");
                    playIcon.classList.add("glyphicon-pause");

                    this.player.play();
                }else {
                    event.target.setAttribute("state_Play","0");
                    playIcon.classList.remove("glyphicon-pause");
                    playIcon.classList.add("glyphicon-play");
                    this.player.pause();
                }
            },
            toggleDiv:function () {
                $("#like_songlist").fadeToggle("slow");
            },
            nextSong:function () {
                console.log(this.songindex);
                this.songindex = ++this.songindex%this.all_songs.length;

                this.player.src = "mp3/"+vm.all_songs[this.songindex].name+".mp3";
                console.log(this.songindex);
                this.player.play();
                if (this.songindex!=0){
                    document.getElementById("lastsong_btn").classList.remove("disabled");
                }else if (this.songindex==0){
                    document.getElementById("lastsong_btn").classList.add("disabled");
                }
            },
            lastSong:function () {

                console.log("切换前index为"+this.songindex);
                this.songindex = --this.songindex;
                console.log("切换后index为"+this.songindex);
                this.player.src = "mp3/"+vm.all_songs[this.songindex].name+".mp3";
                this.player.play();
                if (this.songindex==0){
                    document.getElementById("lastsong_btn").classList.add("disabled");
                }
            }
        }
    });

    // $("#test").click =function () {
    //     $("#like_songlist").fadeToggle("slow");
    // }


};
