import {
  Component,
  OnInit,
  Inject,
  Renderer2,
  ElementRef,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  HostBinding,
} from "@angular/core";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
  RouterOutlet,
} from "@angular/router";
import { routerTransition } from "./router.animations";

import { isPlatformBrowser, DOCUMENT } from "@angular/common";
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  animations: [routerTransition],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AppComponent implements OnInit {
  /**
   * AppComponent define the general layout common to all pages.
   * It include header, navigation, and footer.
   * It also include some logic regarding Angular for smooth transitions between pages.
   **/

  navigationMenuStatus: Boolean;
  path: string;
  headerState: string;
  hideMenuAnimation: Boolean;
  // Boolean to toggle the logo opacity effect
  contentIsScrolledTop: Boolean;

  // Skip enter animations on first paint / hydration so prerendered HTML does not flash.
  @HostBinding("@.disabled")
  animationsDisabled = true;

  private readonly siteOrigin = "https://sebastienbarbier.com";
  private readonly defaultShareImage = `${this.siteOrigin}/assets/images/ressources/sebastienbarbier_profile_1024.jpg`;

  constructor(
    private router: Router,
    private element: ElementRef,
    private renderer: Renderer2,
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private _document: Document,
  ) {
    this.navigationMenuStatus = false;
    this.hideMenuAnimation = true;
    this.contentIsScrolledTop = false;

    this.path = "";
    this.headerState = "";
  }

  closeNavigation() {
    this.navigationMenuStatus = false;
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      // Main instanceof event:
      // NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RoutesRecognized
      if (event instanceof NavigationStart) {
        // On page change, we close navigation menu
        if (this.navigationMenuStatus === true) {
          this.navigationMenuStatus = !this.navigationMenuStatus;
        }
      }
      // Start loading animation on menu icon
      if (event instanceof RouteConfigLoadStart && !this.hideMenuAnimation) {
        this._document
          .getElementById("navigation__button")
          ?.classList.add("isLoading");
      }
      // Stop loading animation on menu icon
      if (event instanceof RouteConfigLoadEnd && !this.hideMenuAnimation) {
        this._document
          .getElementById("navigation__button")
          ?.classList.remove("isLoading");
      }
      if (event instanceof NavigationEnd) {
        this.path = event.url;
        // We enable overflow on body if fullscreen action had disabled it
        this._document.body.style.overflow = "auto";

        if (this.hideMenuAnimation) {
          this.hideMenuAnimation = false;
          // Re-enable route/page animations after the first paint.
          if (isPlatformBrowser(this.platformId)) {
            this.animationsDisabled = false;
          }
        }

        /**
         * Handle header animation on scroll to avoid overlapping content together
         *
         **/
        const SCROLL_PX_TRIGGER_HEADER_ANIMATION = 40;
        const wrappers = this._document.getElementsByClassName("wrapper");
        if (wrappers.length != 0) {
          const element = wrappers[wrappers.length - 1];

          if (element.scrollTop < SCROLL_PX_TRIGGER_HEADER_ANIMATION) {
            setTimeout(() => {
              this.contentIsScrolledTop = true;
            }, 400);
          }

          // Add listenner to hider with opacity te header logo
          element.addEventListener("scroll", (event) => {
            if (element.scrollTop < SCROLL_PX_TRIGGER_HEADER_ANIMATION) {
              this.contentIsScrolledTop = true;
            } else {
              this.contentIsScrolledTop = false;
            }
          });
        }
      }
    });
  }

  getState(outlet: RouterOutlet) {
    /**
     * Will be triggered on every page navigation
     **/
    this.updatePageSeo(outlet);

    // Update theme value (light/dark) based on route description
    this.renderer.setAttribute(
      this.renderer.parentNode(this.element.nativeElement),
      "class",
      outlet.activatedRouteData.theme,
    );

    // Return state
    return outlet.activatedRouteData.state;
  }

  private updatePageSeo(outlet: RouterOutlet) {
    const data = outlet.activatedRouteData;
    const is404 = data.state === "404";
    const title = data.title
      ? `${data.title} - Sebastien Barbier`
      : data.state === "home"
        ? "Sebastien Barbier — Software Engineer in Zurich"
        : "Sebastien Barbier";
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

    this.metaService.updateTag({ property: "og:type", content: "website" });
    this.metaService.updateTag({
      property: "og:site_name",
      content: "Sebastien Barbier",
    });
    this.metaService.updateTag({ property: "og:title", content: title });
    this.metaService.updateTag({
      property: "og:description",
      content: description,
    });
    this.metaService.updateTag({ property: "og:url", content: canonicalUrl });
    this.metaService.updateTag({
      property: "og:image",
      content: this.defaultShareImage,
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
      content: this.defaultShareImage,
    });
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
    let link = this._document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!link) {
      link = this.renderer.createElement("link");
      this.renderer.setAttribute(link, "rel", "canonical");
      this.renderer.appendChild(this._document.head, link);
    }
    this.renderer.setAttribute(link, "href", url);
  }

  private removeCanonicalLink() {
    const link = this._document.querySelector('link[rel="canonical"]');
    if (link?.parentNode) {
      this.renderer.removeChild(link.parentNode, link);
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
