import { Component, Input, OnChanges }       from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { Address, Hero, states } from './data-model';
import { HeroService } from './hero.service';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html'
})
export class HeroDetailComponent implements OnChanges {
  @Input() hero: Hero;

  heroForm: FormGroup;
  nameChangeLog: string[] = [];
  states = states;

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService) {

    this.createForm();
    this.logNameChange();
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: '',
      address: this.fb.array([]),
      power: '',
      sidekick: ''
    });
  }

  ngOnChanges() {
    this.heroForm.reset({
      name: this.hero.name
    });
    this.setAddresses(this.hero.addresses);
  }

  get getAddress(): FormArray {
    return this.heroForm.get('address') as FormArray;
  };

  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(addressHero => this.fb.group(addressHero));
    const addressFormArray = this.fb.array(addressFGs);
    this.heroForm.setControl('address', addressFormArray);
  }

  addLair() {
    this.getAddress.push(this.fb.group(new Address()));
  }

  onSubmit() {
    //this.hero = this.prepareSaveHero();
    //this.heroService.updateHero(this.hero).subscribe(/* error handling */);
    //this.ngOnChanges();
  }

  // prepareSaveHero(): Hero {
  //   const formModel = this.heroForm.value;

  //   // deep copy of form model lairs
  //   const addressDeepCopy: Address[] = formModel.address.map(
  //     (address: Address) => Object.assign({}, address)
  //   );

  //   // return new `Hero` object containing a combination of original hero value(s)
  //   // and deep copies of changed form model values
  //   const saveHero: Hero = {
  //     id: this.hero.id,
  //     name: formModel.name as string,
  //     // addresses: formModel.address // <-- bad!
  //     addresses: addressDeepCopy
  //   };
  //   return saveHero;
  // }

  revert() { this.ngOnChanges(); }

  logNameChange() {
    const nameControl = this.heroForm.get('name');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }
}
