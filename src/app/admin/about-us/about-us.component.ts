import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss', '../../Modal/admin-style.css', '../../Modal/main-style.css']
})
export class AboutUsComponent {

  controlView: string = "add-data";

  uploading: any = "";

  data: any[] = [
    { id: 0, title: "بسم الله الرحمن الرحيم الحمد لله رب العالمين والصلاة والسلام على نبينا وسيدنا محمد وعلى آله وصحبه وسلم مستمعي الكرام السلام عليكم ورحمة الله وبركاته وأسعد الله أوقاتكم بكل خير هذه حلقة جديدة من برنامجكم الأسبوعي لقاء مع عالم لقائنا في هذه الحلقة مع واحد من أعضاء هيئة كبار العلماء في المملكة العربية السعودية أيضاً ضيفنا عضو في جامعة الإمام محمد بن سعود الإسلامية بل هو أستاذ في أحد المعاهد التابعي للجامعة يدرس في المعهد العالي للقضاء له أنشطة عبر وسائل الإعلام له أنشطة أيضاً صحفية ولعلكم أيضاً تابعتم الكثير منها لا أطيل في المقدمة سأدع الكلام لضيفنا كي ما يتفضل بالحديث عن نفسه فليعرف بنفسه فلنرحب بضيف البرنامج  ", text: "بسم الله الرحمن الرحيم الحمدلله رب العالمين وصلى الله وسلم على نبينا محمد وعلى آله وصحبه وبعد محدثكم هو صالح بن فوزان بن عبدالله الفوزان  " },
    { id: 1, title: "التحصيل العلمي ؟ ", text: "التحصيل العلمي دراسة نظامية ابتداء من المدرسة الابتدائية إلى أن تخرجنا من الجامعة والحمدلله ويضاف إلى ذلك المشاركة في حلقات بعض العلماء كحلقة الشيخ عبدالله بن محمد بن حميد رحمه الله في بريدة والشيخ إبراهيم بن عبد المحسن بن عبيد أيضا في بريدة وحضرت أيضا كثيراً من حلقات التدريس في المساجد بعضها شاركت فيه وبعضها كنت مستمعاً مع الحاضرين واستفدت منها والحمد لله خيراً كثيراً إضافة إلى المقررات التي درستها في المراحل الدراسية وفيها الخير الكثير والحمدلله ." }
  ]

  deletedItem: any = {};

  constructor(private formBuilder: FormBuilder) { }

  about = this.formBuilder.group({
    id: [new Date().getTime()],
    title: [""],
    text: [""],
  })

  dataControl() {
    if(this.controlView=="add-data")
    this.about.patchValue({
      id:new Date().getTime(),
      title:"",
      text:"",
    })
  }

  // promo upload to show which files uploaded and the size of each photo
  upload(event: any) {
    const files = event.target.files[0];
    let loader = new FileReader();
    if (event.target.files[0].size / 1024 > 30)
      loader.readAsDataURL(event.target.files[0])
    loader.onload = (event) => {
      this.uploading = event.target?.result;  // show the photos before uploading
    }
  }

  edit(item: any) {
    this.about.patchValue({
      id: item.id,
      title: item.title,
      text: item.text,
    })
  }

  set_delete(item: any) {
    this.deletedItem = item;
  }
}
