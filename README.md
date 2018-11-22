| [Linux][lin-link] | [Codecov][cov-link] |
| :---------------: | :-----------------: |
| ![lin-badge]      | ![cov-badge]        |

[lin-badge]: https://travis-ci.org/realoptions/main_site.svg "Travis build status"
[lin-link]:  https://travis-ci.org/realoptions/main_site "Travis build status"
[cov-badge]: https://codecov.io/gh/realoptions/main_site/branch/master/graph/badge.svg
[cov-link]:  https://codecov.io/gh/realoptions/main_site

## Main site for option model APIs

This was copied from the [option_price_faas](https://github.com/phillyfan1138/option_price_faas/commit/45b67ee74a9e368ee8e038375875fd49eb2dff1c) at commit `45b67ee74a9e368ee8e038375875fd49eb2dff1c`.  

## Refactor strategy

The app requires the following:

* Not registered, not coming from marketplace
* Not registered, coming from marketplace
* Not logged in but previous registered, not coming from marketplace
* Not logged in but previous registered, coming from marketplace
* Already logged in (using jwt), not coming from marketplace
* Already logged in (using jwt), coming from marketplace

The necessary actions to get this to work:
* Not registered, not coming from marketplace
    * Go to register page
    * Register
    * API key auto-generated
    * Auto signed up for free tier
* Not registered, coming from marketplace
    * At register page
    * Register
    * API key auto-generated
    * Signed up for paid tier
* Not logged in but previous registered, not coming from marketplace
    * Go to login page
    * Log in
    * Can use free tier
    * Can click link to go to marketplace to obtain paid plan
* Not logged in but previous registered, coming from marketplace
    * At register page
    * Login
    * Signed up for paid tier
* Already logged in (using jwt), not coming from marketplace
    * View subscriptions (paid or free)
* Already logged in (using jwt), coming from marketplace
    * Signed up for paid tier

These actions have can be distilled into the following queries of the backend:
1. Register/Login=>Retrieve current subscriptions=>Subscribe as necessary, unsubscribe as necessary
2. Subscribe=>Subscribe/Unsubcribe as necessary

Data required at each step:
1. If from marketplace or not
2. Current subscriptions

