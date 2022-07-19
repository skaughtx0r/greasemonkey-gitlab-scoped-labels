// ==UserScript==
// @name     GitLab scoped labels (view only)
// @version  11
// @grant    none
// @include  https://git.octocat.lab/*
// @license  GPL-3.0 License; https://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==
  // Don't do anything unless this is a Gitlab instance
if (document.querySelector("meta[property='og:site_name']")?.getAttribute("content") == "GitLab") {

    if(window.location.pathname.match(/.*\/boards/)) { // boards
      const callback = function(mutations, observer) {
        for(const mutation of mutations) {
          for(const addedElement of mutation.addedNodes) {
            const labels = document.querySelectorAll("span.gl-label");
            for(const label of labels) {
              if(label.innerText.includes("::")) {
                label.classList.add("gl-label-scoped")
                label.innerHTML = label.innerText.replace(/([^:]*)::([^:]*)/, "<a href='#' class='gl-link gl-label-link'><span class='gl-label-text'>$1</span> <span class='gl-label-text-scoped'>$2</span></a>");
              } else if(label.parentNode.classList.contains("board-title-text")) {
                label.classList.add("gl-label-scoped")
              }
            }
          }
        }
      }
      const observer = new MutationObserver(callback)
      observer.observe(document, { childList: true, subtree: true })
    } else if(window.location.pathname.match(/.*\/issues$/)) { // issues list
      const labels = document.querySelectorAll("span.gl-label");
      for(const label of labels) {
        if(label.firstChild.firstChild.innerText.includes("::")) {
          label.classList.add("gl-label-scoped")
          label.setAttribute("style", label.getAttribute("style") + label.firstChild.innerHTML.replace(/<.*style="background-color: (#\w*)">.*/, "--label-background-color: $1; --label-inset-border: inset 0 0 0 1px $1;"))
          label.firstChild.innerHTML = label.firstChild.innerHTML.replace(/<(.*)>([^:]*)::([^:]*)<\/span>/, "<$1>$2</span> <span class='gl-label-text-scoped'>$3</span>")
        }
      }
    } else if(window.location.pathname.match(/.*\/-\/issues\/.*/)) { // issue details
      const menuLabels = document.querySelectorAll("span.gl-label");
      for(const label of menuLabels) {
        if(label.innerText.includes("::")) {
          label.classList.add("gl-label-scoped")
          label.setAttribute("style", label.getAttribute("style") + label.firstChild.innerHTML.replace(/<.*style="background-color: (#\w*)">.*/, "--label-background-color: $1; --label-inset-border: inset 0 0 0 1px $1;"))
          label.firstChild.innerHTML = label.firstChild.innerHTML.replace(/(.*)([^:]*)::([^:]*)(.*)/, "$1 $2</span> <span class='gl-label-text-scoped'>$3</span>$4")
        }
      }
      const callback = function(mutations, observer) {
        for(const mutation of mutations) {
          if(mutation.target.classList.contains("notes")) {
            for(const timeline of mutation.addedNodes) {
              const labels = timeline.querySelectorAll("span.gl-label")
              for(const label of labels) {
                if(label.innerText.includes("::")) {
                  label.classList.add("gl-label-scoped")
                  label.firstChild.innerHTML.replace(/<.* style="background-color: (#\w*)".*/, "--label-background-color: $1; --label-inset-border: inset 0 0 0 1px $1;")
                  label.setAttribute("style", label.getAttribute("style") + label.firstChild.innerHTML.replace(/<.* style="background-color: (#\w*)".*/, "--label-background-color: $1; --label-inset-border: inset 0 0 0 1px $1;"))
                  label.firstChild.innerHTML = label.firstChild.innerHTML.replace(/<(.*)>([^:]*)::([^:]*)<\/span>/, "<$1>$2</span> <span class='gl-label-text-scoped'>$3</span>")
                }
              }
            }
          }
        }
      }
      const observer = new MutationObserver(callback)
      observer.observe(document, { childList: true, subtree: true })
    } else if(window.location.pathname.match(/.*\/labels/)) { // labels
      const labels = document.querySelectorAll("span.gl-label");
      for(const label of labels) {
        if(label.innerText.includes("::")) {
          label.classList.add("gl-label-scoped")
          const color = label.innerHTML.replace(/<.*style="background-color: (#\w*)".*/, "$1")
          label.setAttribute("style", label.getAttribute("style") + "--label-background-color: " + color + "; --label-inset-border: inset 0 0 0 2px " + color + "; color " + color + ";")
          label.innerHTML = label.innerText.replace(/([^:]*)::([^:]*)/, "<span style='background-color: " + color + "' class='gl-label-text gl-label-text-light'>$1</span> <span class='gl-label-text-scoped'>$2</span>");
        }
      }
    } else if(window.location.pathname.match(/.*\/merge_requests$/)) { // merge request list
      const labels = document.querySelectorAll("span.gl-label");
      for(const label of labels) {
        if(label.innerText.includes("::")) {
          label.classList.add("gl-label-scoped")
          const color = label.innerHTML.replace(/<.*style="background-color: (#\w*)".*/, "$1")
          label.setAttribute("style", label.getAttribute("style") + "--label-background-color: " + color + "; --label-inset-border: inset 0 0 0 2px " + color + "; color " + color + ";")
          label.innerHTML = label.innerText.replace(/([^:]*)::([^:]*)/, "<span style='background-color: " + color + "' class='gl-label-text gl-label-text-light'>$1</span> <span class='gl-label-text-scoped'>$2</span>");
        }
      }
    } else if(window.location.pathname.match(/.*\/merge_requests\/.*/)) { // merge request
      const labels = document.querySelectorAll("span.gl-label");
      for(const label of labels) {
        if(label.innerText.includes("::")) {
          label.classList.add("gl-label-scoped")
          const color = label.innerHTML.replace(/<.*style="background-color: (#\w*)".*/, "$1")
          label.setAttribute("style", label.getAttribute("style") + "--label-background-color: " + color + "; --label-inset-border: inset 0 0 0 2px " + color + "; color " + color + ";")
          label.innerHTML = label.innerText.replace(/([^:]*)::([^:]*)/, "<span style='background-color: " + color + "' class='gl-label-text gl-label-text-light'>$1</span> <span class='gl-label-text-scoped'>$2</span>");
        }
      }
      const callback = function(mutations, observer) {
        for(const mutation of mutations) {
          if(mutation.target.classList.contains("notes")) {
            for(const timeline of mutation.addedNodes) {
              const labels = timeline.querySelectorAll("span.gl-label")
              for(const label of labels) {
                if(label.innerText.includes("::")) {
                  label.classList.add("gl-label-scoped")
                  label.firstChild.innerHTML.replace(/<.* style="background-color: (#\w*)".*/, "--label-background-color: $1; --label-inset-border: inset 0 0 0 1px $1;")
                  label.setAttribute("style", label.getAttribute("style") + label.firstChild.innerHTML.replace(/<.* style="background-color: (#\w*)".*/, "--label-background-color: $1; --label-inset-border: inset 0 0 0 1px $1;"))
                  label.firstChild.innerHTML = label.firstChild.innerHTML.replace(/<(.*)>([^:]*)::([^:]*)<\/span>/, "<$1>$2</span> <span class='gl-label-text-scoped'>$3</span>")
                }
              }
            }
          }
        }
      }
      const observer = new MutationObserver(callback)
      observer.observe(document, { childList: true, subtree: true })
    }
}
