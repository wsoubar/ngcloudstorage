import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from "angularfire2/storage";
import { Observable } from 'rxjs/Observable';
//import 'rxjs/operator/map';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  uploadState: Observable<string>;

  constructor(private afStorage: AngularFireStorage ) {
  }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    console.log('id', id);
    this.task = this.ref.put(event.target.files[0]);
    console.log('upload');
    this.task.then(a=>{
      console.log('sucesso');
      this.downloadURL = this.ref.getDownloadURL();
    });
    this.uploadProgress = this.task.percentageChanges();
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
  }


}
