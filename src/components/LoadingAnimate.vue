<style>
#bks1 {
  margin: 0;

  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.bks {
  width: 100%;
  display: flex;
  justify-content: center;
}
.lds-hourglass {
  display: inline-block;
  position: flex;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid rgb(15 23 42);
  border-color: rgb(100 116 139) transparent rgb(15 23 42) transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>
<template>
  <div id="bks1">
    <div class="bks"><div class="lds-hourglass"></div></div>
  </div>
</template>
