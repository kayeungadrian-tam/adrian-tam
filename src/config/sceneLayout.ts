import { ro } from 'element-plus/es/locale';
import * as THREE from 'three'

// Bookshelf
const bookshelfHight = 4.0;
const bookshelfPosition_x = 2.2;
const bookshelfPosition_y = 0.0;
const bookshelfPosition_z = -4.4;

// Chair
const chairPosition_x = -1.2;
const chairPosition_y = 0.0;
const chairPosition_z = -3.8;

// Table
const tablePosition_x = 0.6;
const tablePosition_y = 0.0;
const tablePosition_z = 1.2;
const tableRotationY = 0;

const avatarPosition_x = 1.8;
const avatarPosition_y = 0.0;
const avatarPosition_z = -1.6;

const playerPosition_x = 2.4;
const playerPosition_y = 0.55;
const playerPosition_z = 4.4;

const ballPosition_x = 1.0;
const ballPosition_y = 0.25;
const ballPosition_z = 0.4;

const certificatePosition_x = -4.8;
const certificatePosition_y = 1.6;
const certificatePosition_z = -4.6;

const roomWidth = 12;
const roomDepth = 10;
const playerRadius = 0.4;
const ballRadius = 0.25;

const cameraOffset = new THREE.Vector3(0, 0.5, 1.2);
const certificateCameraOffset = new THREE.Vector3(0, 0.5, -2.2);
const labelOffset = new THREE.Vector3(0, 1.4, 0);

export const sceneLayout = {
  followOffset: new THREE.Vector3(0, 1.4, 3.2),
  roomWidth: roomWidth,
  roomDepth: roomDepth,
  playerRadius: playerRadius,
  ballRadius: ballRadius,
  ballPosition: new THREE.Vector3(ballPosition_x, ballPosition_y, ballPosition_z),
  tablePosition: new THREE.Vector3(tablePosition_x, tablePosition_y, tablePosition_z),
  tableRotationY: tableRotationY,
  chairPosition: new THREE.Vector3(chairPosition_x, chairPosition_y, chairPosition_z),
  bookshelfPosition: new THREE.Vector3(bookshelfPosition_x, bookshelfPosition_y, bookshelfPosition_z),
  avatarPosition: new THREE.Vector3(avatarPosition_x, avatarPosition_y, avatarPosition_z),
  avatarRotationY: Math.PI,
  playerPosition: new THREE.Vector3(playerPosition_x, playerPosition_y, playerPosition_z),
  certificatePosition: new THREE.Vector3(certificatePosition_x, certificatePosition_y, certificatePosition_z),
  certificateRotationY: 0,
  labels: [
    {
      text: 'Education',
      position: new THREE.Vector3(
        bookshelfPosition_x,
        bookshelfPosition_y + 2.6,
        bookshelfPosition_z
      ),
    },
    {
      text: 'Work',
      position: new THREE.Vector3(tablePosition_x, tablePosition_y + 2.0, tablePosition_z),
    },
    {
      text: 'About me',
      position: new THREE.Vector3(chairPosition_x, chairPosition_y + 1.4, chairPosition_z),
    },
    {
      text: 'Awards',
      position: new THREE.Vector3(
        certificatePosition_x + labelOffset.x,
        certificatePosition_y + 0.7,
        certificatePosition_z + labelOffset.z
      ),
    },
  ],
  interactables: [
    {
      id: 'table',
      position: new THREE.Vector3(tablePosition_x, tablePosition_y + 1.0, tablePosition_z),
      cameraOffset: certificateCameraOffset,
    },
    {
      id: 'chair',
      position: new THREE.Vector3(chairPosition_x, chairPosition_y + 1.0, chairPosition_z + 1.2),
      cameraOffset: cameraOffset,
    },
    {
      id: 'bookshelf',
      position: new THREE.Vector3(bookshelfPosition_x, bookshelfPosition_y + bookshelfHight / 2, bookshelfPosition_z + 1.2),
      cameraOffset: cameraOffset,
    },
    {
      id: 'certificate',
      position: new THREE.Vector3(certificatePosition_x, certificatePosition_y + 1.0, certificatePosition_z + 1.2),
      cameraOffset: cameraOffset,
    },
  ],
}
