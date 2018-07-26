import { Component, OnInit, ContentChild, Input, Output, OnDestroy, TemplateRef, EventEmitter, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ngui-in-view',
  templateUrl: './ngui-in-view.component.html',
  styleUrls: ['./ngui-in-view.component.css']
})
export class NguiInViewComponent implements OnInit, OnDestroy {

  observer: IntersectionObserver;
  inView: boolean = false;
  once50PctVisible: boolean = false;

  @ContentChild(TemplateRef) template: TemplateRef<any>;
  @Input() options: any = { threshold: [.1, .2, .3, .4, .5, .6, .7, .8] };
  @Output('inView') inView$: EventEmitter<any> = new EventEmitter();
  @Output('notInView') notInView$: EventEmitter<any> = new EventEmitter();

  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
      this.observer.observe(this.element.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  handleIntersect(entries, observer): void {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        this.inView = true;
        this.inView$.emit(entry);
      } else {
        this.notInView$.emit(entry);
      }
    });
  }

}
