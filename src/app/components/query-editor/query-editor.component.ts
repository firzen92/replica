import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.scss']
})
export class QueryEditorComponent implements OnInit, AfterViewInit {

  blueText = [/(sort)/g, /(desc)/g, /(limit)/g, /(filter)/g, /(like)/g]
  modifiedQ: string [] = [];
  //  '(.*?)'

  @ViewChild('qEditor') qEditor: ElementRef;
  @ViewChild('likeInput') likeInput: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.qEditor.nativeElement.innerHTML = '<pre>sort @timestamp desc \n|  limit  20<pre>';
    this.addColors();
  }

  addColors() {
    let qETextHtml = this.qEditor.nativeElement.innerHTML;
    this.blueText.forEach(text => {
      const matched = qETextHtml.match(new RegExp(text));
      if(matched && matched[0]) {
        qETextHtml = qETextHtml.replaceAll(new RegExp(text),  '<span style="color: blue">' + 
                                                              matched[0] +
                                                              '</span>');
      }
    });
    this.qEditor.nativeElement.innerHTML = qETextHtml;
  }

  onQueryAdded(e: any) {
    const enteredQ = e.target.value;
    if(this.isAvailable(enteredQ)) {
      e.preventDefault();
      e.target.value = '';
      return;
    }
    this.modifiedQ.push(` | filter @message like '${enteredQ}'`);
    this.updateEditor()
  }

  onQueryRemoved(e: any) {
    const enteredQ = e.detail.item.value;
    this.modifiedQ = this.modifiedQ.filter(q => !q.includes(`\'${enteredQ}\'`));
    this.updateEditor();
  }

  updateEditor() {
    this.qEditor.nativeElement.innerHTML = '<pre>sort @timestamp desc \n' + this.modifiedQ.join('\n') + '\n | limit 20</pre>';
    this.addColors();
  }

  isAvailable(element: string) {
    return this.modifiedQ.some(q => q.includes(`\'${element}\'`));
  }


}
