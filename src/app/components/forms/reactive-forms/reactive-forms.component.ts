import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.css'
})
export class ReactiveFormsComponent {

  constructor(
    private _fB: FormBuilder
  ){

  }

  public profileForm = this._fB.group({
    name: ['', [Validators.minLength(2), Validators.maxLength(5)]],
    mystacks: this._fB.group({
      front: ['Angular 17'],
      back: ['Spring Boot 3']
    }),
    myFavoriteFoods: this._fB.array([
      ["Pizza"],
      ["Burguer"],
    ])
  });

  public update(){
    this.profileForm.patchValue({
      name: "Clodivaldo",
      mystacks: {
        front: "HTML 4",
        back: "PHP 5"
      }
    })
  }

  public addFavoriteFood(newfood: string){
    const newFood = this.profileForm.get('myFavoriteFoods') as FormArray;
    const addItens = new FormControl(newfood)

    newFood.push(addItens);
  }

  public submit (){
    if(this.profileForm.valid){
      console.log("Formulário válido")
      console.log(this.profileForm.value)
      console.log(this.profileForm.valid)
  } else{
    console.log("Formulário inválido")
    console.log(this.profileForm.value)
  }
}
}
