import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// Коли включив відео я виповняюсь, допоки не оновиш сторінку з мене ніхто не вийде
player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  const seconds = data.seconds;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seconds));

  console.log('Живу тут');
}

const savedData = localStorage.getItem(STORAGE_KEY);
const parsedData = JSON.parse(savedData);
if (savedData) {
  console.log('виповняюсь');
  player.setCurrentTime(parsedData);
}
