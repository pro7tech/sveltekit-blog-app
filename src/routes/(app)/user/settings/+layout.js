/** @type {import('./$types').LayoutLoad} */
export function load({ route }) {
  let sections = [
    {
      name: "Profile",
      icon: "outline/user-circle",
      url: "/user/settings",
    },
    {
      name: "Password",
      icon: "outline/key",
      url: "/user/settings/password",
    },
  ]

  let title = ""
  sections.forEach((section) => {
    if (route.id == "/(app)" + section.url) {
      section.active = true
      title = section.name
    }
  })

  return {
    sections: sections,
    title: title,
  }
}
