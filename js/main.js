/**
 * Created by 延松松松松 on 2018/4/8.
 */
window.onload=function () {


    var song_list_div =  document.getElementsByClassName("song_list");
    song_list_div[1].style.display = "none";
    song_list_div[2].style.display = "none";


    function parseLyric(lrc) {
        var lyrics = lrc.split("\n");
        for (var value in lyrics){
//            console.log(value)
        }
        var lrcObj = {};
        for(var i=0;i<lyrics.length;i++){
            var lyric = decodeURIComponent(lyrics[i]);
            var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
            var timeRegExpArr = lyric.match(timeReg);
            if(!timeRegExpArr)continue;
            var clause = lyric.replace(timeReg,'');
            for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
                var t = timeRegExpArr[k];
                var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                var time = min * 60 + sec;
                lrcObj[time] = clause;
            }
        }
        return lrcObj;
    }

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
            duration: "0:00",
            duration_ZhunQue:0,
            currentTime:"0:00",
            voice_volume:0,
            music_volume:0,
            song_title:null,
            playbackRate:1,


            int_voice:0,
            int_time:2
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

                document.getElementById("select_speed").value = "正常";
                // console.log(event.target.getAttribute("numb"));
                console.log("当前int"+ vm.int_time);
                // window.clearInterval(vm.int_time);
                var index = event.target.getAttribute("numb");
                vm.player = document.getElementById("media");
                vm.player.src = "mp3/"+vm.all_songs[index].name+".mp3";
                vm.song_title = vm.all_songs[index].name
                vm.player.play();
                vm.songindex = index;

                event.target.setAttribute("state_Play","1");
                playIcon.classList.remove("glyphicon-play");
                playIcon.classList.add("glyphicon-pause");

                // vm.ShowLrc(vm.all_songs[index].name);

                // this.duration  = this.player.duration
            //    下面是获取播放时间
                var b = vm.player;
                //由于音乐需要加载 所以必须等到 canplay 才能获取到duration
                b.addEventListener("canplay",function () {
                    console.log(vm.int_time);

                    var bt = b.duration;
                    console.log(bt);
                    vm.duration_ZhunQue = bt;
                    vm.duration =Math.floor(bt/60)+":"+(bt%60/100).toFixed(2).slice(-2);
                    // console.log(vm.duration);
                    vm.int_time = setInterval(function () {
                         console.log("setInterval之后 的int是"+vm.int_time)
                        vm.AutoChangeMusic_volumn(b,bt);
                        // console.log(ct+","+vm.currentTime)
                    },1000);

                    // window.clearInterval(vm.int_time);

                    //**************监听 int_time 当他发生变化的时候（即切歌） clearInterval 之前的
                    vm.$watch("int_time",function () {
                        window.clearInterval(vm.int_time);
                    })
                    // window.clearInterval(vm.int_time);
                })
            },
            AutoChangeMusic_volumn:function(b,bt){
                var ct = b.currentTime;
                bt = b.duration
                console.log( ","+ vm.int_time) ;
                vm.currentTime = Math.floor(ct/60)+":"+(ct%60/100).toFixed(2).slice(-2);
                vm.music_volume = (ct/bt)*100;
                console.log("被除数duration为"+ bt);
            },
            changePlayOrPause:function () {
                // window.clearInterval(vm.int_time);
                var state = event.target.getAttribute("state_Play");
                var playIcon = document.getElementById("playIcon");
                if (state==0){
                    event.target.setAttribute("state_Play","1");
                    playIcon.classList.remove("glyphicon-play");
                    playIcon.classList.add("glyphicon-pause");

                    var b = this.player;
                    this.player.play();
                    vm.int_time = setInterval(function () {
                        var ct = b.currentTime;
                        console.log(ct);

                        vm.currentTime = Math.floor(ct/60)+":"+(ct%60/100).toFixed(2).slice(-2);
                        // console.log(ct+","+vm.currentTime)
                    },1000)
                }else {
                   // window.clearInterval(vm.int_time);
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
                // window.clearInterval(vm.int_time);
                document.getElementById("select_speed").value = "正常";

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
                window.clearInterval(vm.int_time);
                document.getElementById("select_speed").value = "正常";

                console.log("切换前index为"+this.songindex);
                this.songindex = --this.songindex;
                console.log("切换后index为"+this.songindex);
                this.player.src = "mp3/"+vm.all_songs[this.songindex].name+".mp3";
                this.player.play();
                if (this.songindex==0){
                    document.getElementById("lastsong_btn").classList.add("disabled");
                }
            },
            chageVoice_volume_setInterval : function (event) {
                 vm.int_voice = setInterval(function () {
                    var value = document.getElementById("voiceRange").value;
                    //  console.log(event)
                    //   console.log(value);
                    vm.voice_volume = value/100;
                    vm.player.volume = vm.voice_volume;
                    console.log(vm.player.volume);
                },100);
                // var value = document.getElementById("voiceRange").value;
                // //  console.log(event)
                // //   console.log(value);
                // vm.voice_volume = value/100;
                // vm.player.volume = vm.voice_volume;
            },
            chageVoice_volume_clearInterval : function () {
                window.clearInterval(vm.int_voice);
            },
            change_music_volume:function () {
                var bt = vm.player.duration;
                // console.log("当前duration"+ bt)
                vm.music_volume = document.getElementById("SongRange").value;
                vm.player.currentTime = (vm.music_volume/100)*bt
            },
            quickly:function () {
            //    快速播放
                vm.player.playbackRate = 1.5;
            },
            slowly:function () {
                //慢速播放
                vm.player.playbackRate = 0.5;
            },
            change_speed:function () {
                var option = document.getElementById("select_speed").value;
                var speed;
                if (option=="正常"){
                    speed = 1;
                }else if (option=="0.8倍速")
                {
                    speed = 0.8;
                }else if (option=="1.2倍速")
                {
                    speed = 1.2;
                }else if (option=="1.5倍速")
                {
                    speed = 1.5;
                }
                // alert(option);
                vm.player.playbackRate = speed;
            },
            //下面的方法是用来解析歌词并且显示当前歌曲的歌词
            ShowLrc:function (url) {
                //首先需要清空当前ul的内容
                // document.getElementById("lrc_list").innerHTML = "";
                $.ajax({
                    url:"lrc/"+url+".lrc",
                    success:function (lrc) {
        //        console.log(lrc);
                        var p = parseLyric(lrc);

                        for(var a = 0;a<50;a++) {

//            console.log(typeof (lrc[1]));
                            if (typeof (lrc[a]) == "undefined") {
//                alert(1);
                                continue;
                            }
                            var li = document.createElement("li");
                            li.innerText = lrc[a];
//                console.log(li);

                            document.getElementById("138test").appendChild(li);
                            // console.log(li);
                        }

                    }
                })
            }

        }
    });




    // $("#test").click =function () {
    //     $("#like_songlist").fadeToggle("slow");
    // }




};
