|Build Status| |Codecov| |license|

frontend-app-library-authoring
==============================

Please tag **@edx/fedx-team** on any PRs or issues.  Thanks.

Introduction
------------

This repository is a template for Open edX micro-frontend applications. It is flagged as a Template Repository, meaning it can be used as a basis for new GitHub repositories by clicking the green "Use this template" button above.  The rest of this document describes how to work with your new micro-frontend after you've created a new repository from the template.

After Copying The Template
--------------------------

You'll want to do a find-and-replace to replace all instances of ``frontend-template-application`` with the name of your new repository.

**Prerequisite**

`Devstack <https://edx.readthedocs.io/projects/edx-installing-configuring-and-running/en/latest/installation/index.html>`_.  If you start Devstack with ``make dev.up.ecommerce`` that should give you everything you need as a companion to this frontend.

**Installation and Startup**

In the following steps, replace "frontend-template-application' with the name of the repo you created when copying this template above.

1. Clone your new repo:

  ``git clone https://github.com/edx/frontend-template-application.git``

2. Install npm dependencies:

  ``cd frontend-template-application && npm install``

3. Start the dev server:

  ``npm start``

The dev server is running at `http://localhost:8080 <http://localhost:8080>`_.

Project Structure
-----------------

The source for this project is organized into nested submodules according to the ADR `Feature-based Application Organization <https://github.com/edx/frontend-template-application/blob/master/docs/decisions/0002-feature-based-application-organization.rst>`_.

Build Process Notes
-------------------

**Production Build**

The production build is created with ``npm run build``.

Internationalization
--------------------

Please see `edx/frontend-platform's i18n module <https://edx.github.io/frontend-platform/module-Internationalization.html>`_ for documentation on internationalization.  The documentation explains how to use it, and the `How To <https://github.com/edx/frontend-i18n/blob/master/docs/how_tos/i18n.rst>`_ has more detail.

.. |Build Status| image:: https://api.travis-ci.org/edx/frontend-app-library-authoring.svg?branch=master
   :target: https://travis-ci.org/edx/frontend-app-library-authoring
.. |Codecov| image:: https://codecov.io/gh/edx/frontend-app-library-authoring/branch/master/graph/badge.svg
   :target: https://codecov.io/gh/edx/frontend-app-library-authoring
.. |license| image:: https://img.shields.io/npm/l/@edx/frontend-app-library-authoring.svg
   :target: @edx/frontend-app-library-authoring

Known Issues
------------

* This MFE is missing unit tests.

* This MFE requires a copy review.

* This MFE requires an accessibility audit.

* The styling in the account dropdown menu in the header does not currently
  match Studio's very well.  This will be improved shortly.

* The current component editing flow is a direct port of
  `ramshackle <https://github.com/open-craft/ramshackle>`_ with only minor
  improvements.  It is pending an UX audit and internationalization,
  among other things.

* Some component types, such as text, videos and CAPA problems, can be added to
  libraries but cannot be edited using Studio's authoring view.  This is a
  limitation of Studio, not this MFE.  Work is under way to improve Studio
  accordingly.

* Users with view only access are able to see the 'User Access' menu item, despite
  the fact it will just kick them back to the detail view.
