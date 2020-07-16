# blux

**blux** is a React framework for building JAMstack websites with a *WYSIWYG CMS.

*The CMS of a **blux** site is the same code and same appearence as the public-facing site, but with extra content-management UI & functionalities on top.

---

## What is blux for? Why does it exist?
☯️ **blux** emerged from a political and philisophical stance of fluidity, egalitarianism and anti-establishment sentiment. It aims to empower those with little, and counter systems that are acquiring too much. 

### Core intentions and principles of this project:
- Provide user-friendly & intuitive content management for web admins, requiring little-to-no tech experience and smallest possible learning curve.
    - Minimalist UI, minimal options, minimal config.
    - Smooth and sleek look & feel. 
    - Hiding mechanisms "under the hood".
- Is JAMStack.
    - Resulting public site is just static web files.
    - Public site's web files live on a git repository.
    - (The lighter set of resources required to serve directly on a CDN results in a site that is less costly to the admin, and to the environment.)
- Does not lock developer or admin into any vendors.
    - Agnostic to any git-provider (not just GitHub or BitBucket).
    - Does not rely on any large cloud host/service providers.
    - CMS can run on lightweight containerised service (must be stateless), and therefore is versatile and easy to host on a multitude of different platforms.
- Is extendable.
    - **blux** is the beginning, not the end. It exists to provide a development environment and set of tools to create diverse ranges of CMS-integrated building blocks that can be shared and reused.
- Embraces change.
    - **blux** hopes to one day branch off into sibling projects that take inspiration from its features and characteristics.
---

## How does it work?
**blux** breaks websites down into *pages*, and *pages* into *blocks*. 

*Pages* and *blocks* are both entities consisting of a React component and a Redux mechanism (actions, action-types & reducer) + state (and also some other bits of optional meta-data). 

*Pages* and *blocks* can be likened to abstract classes in OOP. Whilst all pages and all blocks have shared functionality, they can only exist in some extended form with unique functionality on top.

The site admin can dynamically add, remove and modify *pages* and *blocks* via the CMS. 

The entire persistent state of the website exists within Redux, and therefore, every bit of content-management that happens is through Redux.

**blux** = bl(ocks) + (red)ux

A feature called the *persister* observes every Redux action that takes place and synchronises the state to JSON files in the CMS' filespace. 

However, because one of **blux**'s core principles is to be able run within stateless containers, it must be assumed that the CMS's filespace is ephemeral. The truly persistant storage of the site's state lies within a git repo, and **blux** pushes automated commits of state-changes to said repo whenever the site admin requests to *save* their modifications.
