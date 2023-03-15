import { PUBLIC_READONLY_MODE } from "$env/static/public"
const isProduction = import.meta.env.PROD;


export const IsReadonlyMode = () => {
  if(PUBLIC_READONLY_MODE === "enabled") {
    return true
  }
  if(PUBLIC_READONLY_MODE === "disabled") {
    return false
  }
  if(PUBLIC_READONLY_MODE === "production") {
    return isProduction 
  }

  return false
}


export const RepoLink = "https://github.com/pro7tech/sveltekit-blog-app"

