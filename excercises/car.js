export class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor (carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }


  displayInfo() {

    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';

    console.log(trunkStatus);

    console.log(
      `${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, ${trunkStatus}`
    );
  }

  openTrunk () {
    if(this.isTrunkOpen === true) {
      this.go();
    }
  }
  

  closeTrunk() {
    if(this.isTrunkOpen === false) {
      this.brake();
    }
  }

  go() {
    if(!this.isTrunkOpen) {
      this.speed += 5;
    }

    if (this.speed > 200) {
      this.speed = 200;
    }
  }

  brake() {
    this.speed -= 5;

    if(this.speed < 0) {
      this.speed = 0;
    }
  }

  openTrunk() {
    if(this.speed === 0) {
      this.isTrunkOpen = false;
    }
  }

  }

  class RaceCar extends Car {
    acceleration;

    constructor(carDetails) {
      super(carDetails);
      this.acceleration = carDetails.acceleration;
    }

    go() {
      this.speed += this.acceleration;

      if(this.acceleration > 300) {
        this.acceleration = 300;
      }
    }

    openTrunk() {
      console.log('Race cars do not have a trunk');
    }

    closeTrunk() {
      console.log('Race cars do have a trunk');
    }

 
   
  }

  const raceCar1 = new RaceCar({
    brand:'McLaren',
    model: 'F1',
    acceleration: 20
  })

 

const car1 = new Car({
  brand: 'Toyata',
  model: 'Corolla'
});

const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});

console.log(car1);
console.log(car2);
car1.displayInfo();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.displayInfo();

// Trunk should not open since the car is moving.
car1.openTrunk();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();

// Trunk should open since the car is not moving.
car2.openTrunk();
// Car should not go since the trunk is open.
car2.go();
car2.displayInfo();

raceCar1.go();
raceCar1.go();
raceCar1.go();
raceCar1.displayInfo();
raceCar1.openTrunk();
raceCar1.displayInfo();
raceCar1.closeTrunk();
raceCar1.displayInfo();
raceCar1.brake();
raceCar1.displayInfo();

// # makes cars private so it can only be changed when your inside cla
// OOP is less popular in JS bc it is missing some features of OOP, like protected
// properites bc its in the child class
