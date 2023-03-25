let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = [ "stick" ];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterstats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name: "stick",
        power: 10
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "Legendary Axe",
        power: 50
    },
    {
        name: "Master Sword",
        power: 100
    }
]

const monsters = [
    {
      name: "slime",
      level: 2,
      health: 15
    },
    {
      name: "fanged beast",
      level: 8,
      health: 60
    },
    {
      name: "dragon",
      level: 20,
      health: 300
    }
];

const locations = [
    {
        name: "town square",
        "button text": ["go to store","go to cave","fight dragon"],
        "button functions":[ goStore, goCave, fightDragon ],
        text: "You are in the town square. You see a sign that says \"store\"."
    },
    {
        name: "Store",
        "button text": ["buy 10 health(10 gold)","buy weapon(30 gold)","go to town square"],
        "button functions":[ buyHealth, buyWeapon, goTown ],
        text: "You have entered the store"
    },
    {
        name: "Cave",
        "button text": ["fight slime","fight fanged beast","go to town square"],
        "button functions":[ fightSlime, fightFangedBeast, goTown ],
        text: "You are in the cave"
    },
	{
		name: "fight",
		"button text": ["Attack", "Dodge", "Run"],
		"button functions": [attack, dodge, goTown],
		text: "You are fighting a monster."
	},
	{
		name: "kill monster",
		"button text": ["Go to town square", "Go to town square", "Go to town square"],
		"button functions": [goTown, goTown, easterEgg],
		text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
	},
	{
		name: "lose",
		"button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
		"button functions": [restart, restart, restart],
		text: "You die. ☠️"
	},
	{
		name: "win",
		"button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
		"button functions": [restart, restart, restart],
		text: "You defeated the dragon! YOU WIN THE GAME! 🎉"
    }
]

//initialize button
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterstats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    text.innerText = location.text
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
}

function goTown()
{
    update(locations[0]);
}

function goStore(){
    update(locations[1]);
}

function goCave(){
    update(locations[2]);
}

function fightSlime(){
    fighting = 0;
    goFight();
}

function fightFangedBeast(){
    fighting = 1;
    goFight();
}

function fightDragon(){
    fighting = 2;
    goFight();
}

function goFight() {
    console.log("fighting " + monsters[fighting].name);
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterHealthText.innerText = monsterHealth;
    monsterNameText.innerText = monsters[fighting].name;
    monsterstats.style.display = "block";
}

function attack(){
    text.innerText = "The "+ monsters[fighting].name +" attacks!";
    text.innerText += "\nyou attack it with your "+weapons[currentWeapon].name+".";
    health-=getMonsterAttackValue(monsters[fighting].level);
    if (isMonsterHit()) {
        
    } else {
        
    }
    monsterHealth-=weapons[currentWeapon].power +Math.floor(Math.random() *xp)+1;
    monsterHealthText.innerText = monsterHealth;
    healthText.innerText = health;
    if(health<=0){
        lose();
    } else if(monsterHealth<=0){
        fighting === 2 ? winGame() : monsterdefeat();
    }
}

function isMonsterHit() {
    
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random()*xp));
    console.log(hit);
    return hit;
}

function dodge(){
    text.innerText = "The "+ monsters[fighting].name +" attacks!";
    text.innerText += "\nYou dodged the attack successfully";
}

function winGame(){
    update(locations[6]);
}

function lose() {
    console.log("you have lost");
    update(locations[5]);
}
function restart() {
    xp = 0;
	health = 100;
	gold = 50;
	currentWeapon = 0;
	inventory = ["stick"];
	goldText.innerText = gold;
	healthText.innerText = health;
	xpText.innerText = xp;
	goTown();
}

function monsterdefeat() {
    console.log(monsters[fighting].name+" has lost");
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
function easterEgg() {
    
}

function buyHealth(){
    if (gold>=10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "You do not have enough gold to buy health";
    }
}

function buyWeapon()
{
    if (currentWeapon< weapons.length-1) {
        if (gold>=30) {
            gold-=30;
            currentWeapon++;
            goldText.innerText = gold;
            let newweapon = weapons[currentWeapon].name;
            text.innerText = "you now have a new "+newweapon+".";
            inventory.push(newweapon);
            text.innerText += "\nIn your inventory you have \n"+inventory;
        } else {
            text.innerText = "You do not have enough gold to buy weapons";
        }
    } else {
        text.innerText = "You already have the most powerful weapon";
        button2.innerText = "Sell weapon(15 gold)";
        button2.onclick = sellweapon;
    }
}

function sellweapon(){
    console.log("sell weapon");
    if (inventory.length>1) {
        gold+=15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "you sold a "+currentWeapon+".";
        text.innerText += "\nYou have in your inventory \n"+ inventory;
    } else {
        text.innerText = "Don't sell your only weapon";
    }
}