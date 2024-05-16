# React Routing Tabs

An accessible tabs library that integrates seamlessly with React Router

## Summary

Creating tabs for your router is easy. Making them meet WAI-ARIA accessibility standards is not.

Lots of tab libraries give you accessible tabs. Connecting them to your router, though, means jumping through lots of hoops.

React Routing Tabs gives you accessible tabs that connect to your router with minimal effort.

## Getting Started

### Requirements

Currently, `react-routing-tabs` works only with `react-router-dom` v6+. Other routers are planned for the future.

React v18+ is required.

### Installation

npm
`npm install react-routing-tabs`

yarn
`yarn add react-routing-tabs`

## Usage

`react-routing-tabs` can be used one of three ways. You can also download and run the repo's Storybook for detailed examples.

### Basic Usage
Manually-configured Tab components.
```tsx
(
  <RoutingTabs>
    <TabList>
      <Tab label="Tab 1" link="tab-1" />

      <Tab label="Tab 2" link="tab-2" />
    </TabList>

    <TabPanelWindow />
  </RoutingTabs>
)
```

### With a Config
Lets you control the tabs through an external `config` object. When used this way, the `TabList` will auto-generate tabs for you!
```tsx
const config = [
  {
    name: "Tab 1",
    route: "tab-1",
  },
  {
    name: "Tab 2",
    route: "tab-2",
  },
];

...

(
  <RoutingTabs config={ config }>
    <TabList />

    <TabPanelWindow />
  </RoutingTabs>
)
```

### With Data
Ideal for using tabs with minimal configuration with data from an external source, such as a REST API. When used in this way, the `TabList` can auto-generate tabs for you!
```tsx
// Example data
 const data = [
  {
    id: 1,
    name: "Tab 1",
    description: "First tab",
    price: 1.23,
    quantity: 42,
  },
  {
    id: 2,
    name: "Tab 2",
    description: "Second tab",
    price: 3.14,
    quantity: 97,
  },
];

...

(
  <RoutingTabs data={ data } tabLabelKey="name">
    <TabList />

    <TabPanelWindow />
  </RoutingTabs>
)
```

### Tabpanels
Wherever your tabpanel is displayed for each link, wrap it in a TabPanel component. When rendered, this will wrap your content with all needed attributes to complete accessibility for your tabs.

```tsx
// Example route from a react-router-dom config
{
  path: "tab-1",
  element: (
    <Tabpanel>
      <ContentComponent />
    </Tabpanel>
  ),
},
```

### Styling
`react-routing-tabs` come with a very basic set of styles. Each component accepts a `className` prop to pass through any additional needed styles. Classes for each component can also be overridden using the CSS framework of your choice (see API below).

----

## API

### RoutingTabs
Component which wraps and defines the tab structure for the section.
Under the hood, this creates a context provider that allows the routing tabs to keep
track of the selection and routes.

All other components must be descendents of `RoutingTabs`.

#### Props
> `useHashRouting?`: boolean (defaults to `false`)
>  - Tells the router if it should route the links with hashes
> 
> `config?`: see below
> ```js
>  {
>    name: string; // Name to be displayed in the tab
>    route?: string; // Route the tab will link to
>  }
>  ```
> - Optional configuration object to define the tab names and routes 
> - Without a defined `route`, the route will derive from the `name`
> 
> `data?`: keyof T
> - Optional data array to be passed to each tab panel
> 
> `tabLabelKey`: string
> - If names / routes come directly from data, this prop defines the key holding that info.
> - Requires 'data'

----

### useRoutingTabs()
A hook which allows access to the data exposed by the `RoutingTabs` context. Accessible by any descendent of `RoutingTabs`

#### Exposed variables
> `config`: RoutingTabsConfig[] | undefined;
> - The `config` object passed into the initial `RoutingTabs` component

> `data`: T[] | undefined;
> - The `data` object passed into the initial `RoutingTabs` component

> `selectedTabId`: string;
> - The `id` of the currently selected tab

> `tabLabelKey`: keyof T | undefined;
> - The `tabLabelKey` passed into the initial `RoutingTabs` component

> `tabRoutes`: string[];
> - All routes derived from the application's tabs, in tab order

----
### TabList
Element which acts as a container for the tabs.
Renders as a `ul` tag and accepts an optional `ref` from the user.

#### Props
(extends `ComponentPropsWithRef<"ul">`)
> `orientation?`: "horizontal" | "vertical" (defaults to `horizontal`)
> - Which direction do the tabs read? Corresponds to the aria-orientation attribute.
> - Default styling matches this attribute
>
> `selectionMethod?`: "automatic" | "manual" (defaults to `automatic`)
> - Will the tab open its corresponding panel when the user arrows to it, or
> - will the user be required to hit 'space' or 'enter'?
>
> `showChildrenAfterTabs?`: boolean (defaults to `false`)
> - If using auto-generated tabs from a config or data, any other children show before the tabs by default.
> - Should the children show after the tabs instead?

### Tab
Component for an individual tab within the tab list
Renders as a `li` tag and accepts an optional ref from the user
Inside the `li` tag, an `a` will render to provide the routing for the tab
Clicking a tab routes to the correct location and, with a properly configured `TabpanelWindow` and `Tabpanel`, displays the appropriate `Tabpanel`.

#### Props
(extends `ComponentPropsWithRef<"a">`)
> `children?`: ReactNode
> - Use children for custom content
>
> `disabled?`: boolean
> - Is this tab disabled, preventing user interaction?
>
> `isNav?`: boolean
> - Is this part of a true nav component?
>
> `label`: string
> - Display text for the tab
>
> `link`?: string
> - Destination link for the tab. If not provided, the tab will use a slug from the label

----
### TabpanelWindow
The area where the `Tabpanels` are displayed. This is a glorifed `Outlet` for `react-router-dom`.

#### Props
> `children?`: ReactNode
> - Use children to render custom content after the Outlet

### Tabpanel
Wrapper element for any tabpanel content to provide accessibility features.

#### Props
(extends `extends ComponentProps<"div">`)
> `children`: ReactNode
. - The tabpanel content to be rendered

