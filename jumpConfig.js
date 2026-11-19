export const GRAVITY = 2000;
export const JUMP_SPEED = 900;
export const BOOST_SPEED = 1450;
export const BOOST_LAUNCH = 1150;
export const MOVE_SPEED = 370;
export const PLAYER_R = 27;
export const METERS_PER_PX = 0.1;
export const BOOST_TIME = 4;
export const SLOW_TIME = 1.6;

const rand = (a, b) => a + Math.random() * (b - a);

function pickType() {
  const r = Math.random();
  if (r < 0.1) return 'beer';
  if (r < 0.24) return 'cheat';
  return 'desk';
}

function addPlatform(w, y, id, platforms, enemies, pickups, floor = false) {
  let nextId = id;
  const width = floor ? 116 : rand(58, 100);
  const x = floor ? w / 2 - 58 : rand(8, Math.max(10, w - 8 - width));
  const type = floor ? 'desk' : pickType();

  platforms.push({ id: nextId++, x, y, w: width, type });

  if (!floor && type === 'desk' && width >= 72 && Math.random() < 0.24) {
    enemies.push({
      id: nextId++,
      x: x + width / 2,
      y,
      minX: x + 19,
      maxX: x + width - 19,
      w: 30,
      h: 34,
      dir: Math.random() < 0.5 ? -1 : 1,
      gone: false,
    });
  }

  if (!floor && Math.random() < 0.3) {
    pickups.push({
      id: nextId++,
      x: rand(22, Math.max(24, w - 22)),
      y: y - rand(48, 76),
      taken: false,
    });
  }

  return nextId;
}

export function createWorld({ w, h }) {
  const floorY = h - 130;
  const platforms = [];
  const enemies = [];
  const pickups = [];
  let id = 1;
  let topY = floorY;

  id = addPlatform(w, floorY, id, platforms, enemies, pickups, true);

  while (topY > -h) {
    topY -= rand(78, 104);
    id = addPlatform(w, topY, id, platforms, enemies, pickups, false);
  }

  const startY = floorY - PLAYER_R;

  return {
    w,
    h,
    x: w / 2,
    y: startY,
    vx: 0,
    vy: 60,
    camTop: 0,
    startY,
    bestY: startY,
    topY,
    nextId: id,
    platforms,
    enemies,
    pickups,
    boost: 0,
    slow: 0,
    invuln: 0,
    height: 0,
    dead: false,
  };
}

export function step(world, dt, dir) {
  if (world.dead) return world;

  const { w, h } = world;
  let { x, y, vx, vy, camTop, topY, nextId, height, bestY, boost, slow, invuln } = world;
  let platforms = world.platforms;
  let enemies = world.enemies;
  let pickups = world.pickups;

  boost = Math.max(0, boost - dt);
  slow = Math.max(0, slow - dt);
  invuln = Math.max(0, invuln - dt);

  // горизонтальное управление: турбо ускоряет, студент тормозит
  const speedMul = (boost > 0 ? 1.4 : 1) * (slow > 0 ? 0.55 : 1);
  const target = dir * MOVE_SPEED * speedMul;
  vx += (target - vx) * Math.min(1, dt * 16);
  x += vx * dt;
  if (x < -PLAYER_R) x = w + PLAYER_R;
  if (x > w + PLAYER_R) x = -PLAYER_R;

  // вертикаль
  const prevBottom = y + PLAYER_R;
  vy += GRAVITY * dt;
  y += vy * dt;

  if (vy > 0) {
    const bottom = y + PLAYER_R;
    for (const p of platforms) {
      const overlapsX = x + PLAYER_R * 0.6 > p.x && x - PLAYER_R * 0.6 < p.x + p.w;
      if (!overlapsX) continue;
      if (prevBottom > p.y + 1 || bottom < p.y) continue;
      if (p.type === 'cheat') {
        p.broken = true;
        continue;
      }
      y = p.y - PLAYER_R;
      const kick = p.type === 'beer' ? BOOST_SPEED : JUMP_SPEED;
      vy = -kick * (boost > 0 ? 1.3 : 1);
      break;
    }
  }

  // студенты гуляют по партам
  for (const e of enemies) {
    e.x += e.dir * 52 * dt;
    if (e.x <= e.minX) {
      e.x = e.minX;
      e.dir = 1;
    } else if (e.x >= e.maxX) {
      e.x = e.maxX;
      e.dir = -1;
    }
  }

  if (invuln <= 0) {
    for (const e of enemies) {
      const hitX = Math.abs(e.x - x) < PLAYER_R * 0.72 + e.w / 2;
      const hitY = y + PLAYER_R > e.y - e.h && y - PLAYER_R < e.y;
      if (hitX && hitY) {
        e.gone = true;
        slow = SLOW_TIME;
        invuln = 1.1;
        vy *= 0.3;
        break;
      }
    }
  }

  // баночки «Балтики»
  for (const c of pickups) {
    const dx = c.x - x;
    const dy = c.y - y;
    if (dx * dx + dy * dy < 38 * 38) {
      c.taken = true;
      boost = BOOST_TIME;
      vy = -BOOST_LAUNCH;
    }
  }

  // камера ползёт вверх
  if (y - camTop < h * 0.42) camTop = y - h * 0.42;

  if (y < bestY) bestY = y;
  const meters = Math.max(0, (world.startY - bestY) * METERS_PER_PX);
  if (meters > height) height = meters;

  platforms = platforms.filter((p) => !p.broken && p.y < camTop + h + 280);
  enemies = enemies.filter((e) => !e.gone && e.y < camTop + h + 280);
  pickups = pickups.filter((c) => !c.taken && c.y < camTop + h + 280);

  if (topY > camTop - 260) {
    while (topY > camTop - 260) {
      topY -= rand(78, 104);
      nextId = addPlatform(w, topY, nextId, platforms, enemies, pickups, false);
    }
  }

  const dead = y - camTop > h + 110;

  return {
    ...world,
    x,
    y,
    vx,
    vy,
    camTop,
    topY,
    nextId,
    platforms,
    enemies,
    pickups,
    height,
    bestY,
    boost,
    slow,
    invuln,
    dead,
  };
}