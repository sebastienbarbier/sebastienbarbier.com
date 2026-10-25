import {
  Component,
  OnInit,
  Inject,
  ElementRef,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
  RouterOutlet,
} from "@angular/router";

import { isPlatformBrowser, DOCUMENT } from "@angular/common";
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(RouterOutlet) private outlet?: RouterOutlet;

  navigationMenuStatus: Boolean;
  path: string;
  headerState: string;
  hideMenuAnimation: Boolean;
  contentIsScrolledTop: Boolean;

  private readonly siteOrigin = "https://sebastienbarbier.com";
  private readonly defaultShareImage = `${this.siteOrigin}/assets/images/ressources/sebastienbarbier_profile_1024.jpg`;
  private scrollListener?: () => void;
  private readonly scrollTriggerPx = 40;

  constructor(
    private router: Router,
    private element: ElementRef,
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
    this.navigationMenuStatus = false;
    this.hideMenuAnimation = true;
    this.contentIsScrolledTop = true;

    this.path = "";
    this.headerState = "";
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.attachScrollListener();
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.navigationMenuStatus === true) {
          this.navigationMenuStatus = !this.navigationMenuStatus;
        }
      }
      if (event instanceof RouteConfigLoadStart && !this.hideMenuAnimation) {
        this.document
          .getElementById("navigation__button")
          ?.classList.add("isLoading");
      }
      if (event instanceof RouteConfigLoadEnd && !this.hideMenuAnimation) {
        this.document
          .getElementById("navigation__button")
          ?.classList.remove("isLoading");
      }
      if (event instanceof NavigationEnd) {
        this.path = event.url;
        this.document.body.style.overflow = "";

        if (this.hideMenuAnimation) {
          this.hideMenuAnimation = false;
        }

        if (this.outlet) {
          this.updatePageSeo(this.outlet);
        }

        this.syncLogoVisibility();
        if (isPlatformBrowser(this.platformId)) {
          this.attachScrollListener();
        }
      }
    });
  }

  ngOnDestroy() {
    this.detachScrollListener();
  }

  private attachScrollListener() {
    this.detachScrollListener();
    this.syncLogoVisibility();

    this.scrollListener = () => this.syncLogoVisibility();
    window.addEventListener("scroll", this.scrollListener, { passive: true });
  }

  private detachScrollListener() {
    if (this.scrollListener) {
      window.removeEventListener("scroll", this.scrollListener);
      this.scrollListener = undefined;
    }
  }

  private syncLogoVisibility() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.contentIsScrolledTop = window.scrollY < this.scrollTriggerPx;
  }

  private updatePageSeo(outlet: RouterOutlet) {
    const data = outlet.activatedRouteData;
    const is404 = data.state === "404";
    const title = data.title
      ? `${data.title} - Sébastien Barbier`
      : data.state === "home"
        ? "Sébastien Barbier | Staff Software Engineer in Zürich"
        : "Sébastien Barbier";
    const description: string = data.description || "";

    this.titleService.setTitle(title);

    if (description) {
      this.metaService.updateTag({ name: "description", content: description });
    } else {
      this.metaService.removeTag('name="description"');
    }

    if (is404) {
      this.metaService.updateTag({ name: "robots", content: "noindex" });
      this.removeCanonicalLink();
      this.clearShareMeta();
      return;
    }

    this.metaService.removeTag('name="robots"');

    const canonicalUrl = this.canonicalUrlFor(this.router.url);
    this.setCanonicalLink(canonicalUrl);

    const shareImage = this.absoluteShareImage(data.shareImage);

    this.metaService.updateTag({ property: "og:type", content: "website" });
    this.metaService.updateTag({
      property: "og:site_name",
      content: "Sébastien Barbier",
    });
    this.metaService.updateTag({ property: "og:title", content: title });
    this.metaService.updateTag({
      property: "og:description",
      content: description,
    });
    this.metaService.updateTag({ property: "og:url", content: canonicalUrl });
    this.metaService.updateTag({
      property: "og:image",
      content: shareImage,
    });

    this.metaService.updateTag({
      name: "twitter:card",
      content: "summary_large_image",
    });
    this.metaService.updateTag({ name: "twitter:title", content: title });
    this.metaService.updateTag({
      name: "twitter:description",
      content: description,
    });
    this.metaService.updateTag({
      name: "twitter:image",
      content: shareImage,
    });
  }

  private absoluteShareImage(shareImage?: string): string {
    if (!shareImage) {
      return this.defaultShareImage;
    }
    if (shareImage.startsWith("http://") || shareImage.startsWith("https://")) {
      return shareImage;
    }
    return `${this.siteOrigin}${shareImage.startsWith("/") ? "" : "/"}${shareImage}`;
  }

  private canonicalUrlFor(routerUrl: string): string {
    const path = routerUrl.split("?")[0].split("#")[0] || "/";
    const normalized =
      path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
    return normalized === "/"
      ? this.siteOrigin
      : `${this.siteOrigin}${normalized}`;
  }

  private setCanonicalLink(url: string) {
    let link = this.document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!link) {
      link = this.document.createElement("link");
      link.setAttribute("rel", "canonical");
      this.document.head.appendChild(link);
    }
    link.setAttribute("href", url);
  }

  private removeCanonicalLink() {
    const link = this.document.querySelector('link[rel="canonical"]');
    if (link?.parentNode) {
      link.parentNode.removeChild(link);
    }
  }

  private clearShareMeta() {
    for (const selector of [
      'property="og:type"',
      'property="og:site_name"',
      'property="og:title"',
      'property="og:description"',
      'property="og:url"',
      'property="og:image"',
      'name="twitter:card"',
      'name="twitter:title"',
      'name="twitter:description"',
      'name="twitter:image"',
    ]) {
      this.metaService.removeTag(selector);
    }
  }
}
