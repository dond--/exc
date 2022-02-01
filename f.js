const TIME_LIMIT=30;
const WARNING_THRESHOLD=10;
const ALERT_THRESHOLD=5;
const COLOR_CODES={
  info:{
    color:"green"
  },
  warning:{
    color:"orange",
    threshold:WARNING_THRESHOLD
  },
  alert:{
    color:"red",
    threshold:ALERT_THRESHOLD
  },
  default:{
    color:"default"
  }
};

let timePassed=null;
let timeLeft=null;
let timerInterval=null;
let remainingPathColor=COLOR_CODES.default.color;

function init(){
  timePassed=0;
  document.getElementById("timeLabel").innerHTML=formatTimeLeft(TIME_LIMIT);
  setRemainingPathColor(TIME_LIMIT);
  startTimer();
  document.getElementById('startStopButton').getElementsByTagName('button')[0].innerHTML='PAUSE';
  document.getElementById('startStopButton').getElementsByTagName('button')[0].onclick=pause;
}

function checkTimer(timeLeft){
  setRemainingPathColor(timeLeft);
  if(timeLeft<=0){
    clearInterval(timerInterval);
    document.getElementById("timeLabel").innerHTML='00';
    document.getElementById('startStopButton').getElementsByTagName('button')[0].innerHTML='START';
    document.getElementById('startStopButton').getElementsByTagName('button')[0].onclick=init;
    return;
  }
  document.getElementById("timeLabel").innerHTML=formatTimeLeft(timeLeft);
}

function formatTimeLeft(time){
  const minutes=Math.floor(time/60);
  let seconds=time%60;
  if(seconds<1)
    return '00';
  if(seconds<10)
    seconds=`0${seconds}`;
  return `${seconds}`;
}

function pause(){
  var timer=document.getElementById('timer');
  if(timer.classList.contains('paused')){
    startTimer();
    document.getElementById('startStopButton').getElementsByTagName('button')[0].innerHTML='PAUSE';
    timer.classList.remove("paused");
//     console.log('running');
  }else{
    clearInterval(timerInterval);
    document.getElementById('startStopButton').getElementsByTagName('button')[0].innerHTML='GO';
    timer.classList.add("paused");
//     console.log('paused');
  }
}

function startTimer(){
  timerInterval=setInterval(()=>{
    timePassed=timePassed+=1;
    timeLeft=TIME_LIMIT-timePassed;
    checkTimer(timeLeft);
  }, 1000);
}

function setRemainingPathColor(timeLeft) {
  if(timeLeft==0){
    document.getElementById("timer_path-remaining").classList.remove(COLOR_CODES.alert.color);
    document.getElementById("timeLabel").classList.remove(COLOR_CODES.alert.color);
    document.getElementById("timer_path-remaining").classList.add(COLOR_CODES.default.color);
    document.getElementById("timeLabel").classList.add(COLOR_CODES.default.color);
  }else if(timeLeft<=ALERT_THRESHOLD){
    document.getElementById("timer_path-remaining").classList.remove(COLOR_CODES.warning.color);
    document.getElementById("timeLabel").classList.remove(COLOR_CODES.warning.color);
    document.getElementById("timer_path-remaining").classList.add(COLOR_CODES.alert.color);
    document.getElementById("timeLabel").classList.add(COLOR_CODES.alert.color);
  }else if(timeLeft<=WARNING_THRESHOLD){
    document.getElementById("timer_path-remaining").classList.remove(COLOR_CODES.info.color);
    document.getElementById("timeLabel").classList.remove(COLOR_CODES.info.color);
    document.getElementById("timer_path-remaining").classList.add(COLOR_CODES.warning.color);
    document.getElementById("timeLabel").classList.add(COLOR_CODES.warning.color);
  }else{
    document.getElementById("timer_path-remaining").classList.remove(COLOR_CODES.default.color);
    document.getElementById("timeLabel").classList.remove(COLOR_CODES.default.color);
    document.getElementById("timer_path-remaining").classList.add(COLOR_CODES.info.color);
    document.getElementById("timeLabel").classList.add(COLOR_CODES.info.color);
  }
}
