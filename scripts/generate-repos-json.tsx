/**
 * This script fetches your GitHub repositories and saves them to a JSON file
 * that you can edit manually to customize your portfolio.
 *
 * Run with: node scripts/generate-repos-json.js
 *
 * Note: No GitHub token is required, but you might hit rate limits without one.
 * If you have many repositories, you can optionally use a token:
 * GITHUB_TOKEN=your_token node scripts/generate-repos-json.js
 */

import fs from "fs"
import path from "path"

// Replace with your GitHub username
const GITHUB_USERNAME = "pakkid"

async function fetchAllRepositories() {
  console.log(`Fetching repositories for ${GITHUB_USERNAME}...`)

  let allRepos = []
  let page = 1
  let hasMorePages = true

  while (hasMorePages) {
    console.log(`Fetching page ${page}...`)

    try {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated`,
      )

      if (!response.ok) {
        if (response.status === 403) {
          console.error("GitHub API rate limit exceeded. You can try again later or use a GitHub token.")
          console.error("To use a token: GITHUB_TOKEN=your_token node scripts/generate-repos-json.js")
          break
        }
        throw new Error(`GitHub API error: ${response.statusText}`)
      }

      const repos = await response.json()

      if (repos.length === 0) {
        hasMorePages = false
      } else {
        allRepos = [...allRepos, ...repos]
        page++
      }
    } catch (error) {
      console.error("Error fetching repositories:", error)
      break
    }
  }

  console.log(`Found ${allRepos.length} repositories.`)
  return allRepos
}

async function fetchLanguagesForRepo(repoFullName) {
  console.log(`Fetching languages for ${repoFullName}...`)

  try {
    const response = await fetch(`https://api.github.com/repos/${repoFullName}/languages`)

    if (!response.ok) {
      console.warn(`Could not fetch languages for ${repoFullName}: ${response.statusText}`)
      return {}
    }

    return await response.json()
  } catch (error) {
    console.warn(`Error fetching languages for ${repoFullName}:`, error)
    return {}
  }
}

async function generateReposJson() {
  try {
    // Fetch all repositories
    const repos = await fetchAllRepositories()

    if (repos.length === 0) {
      console.error("No repositories found or couldn't fetch repositories.")
      return
    }

    // Fetch languages for each repository
    const reposWithLanguages = await Promise.all(
      repos.map(async (repo) => {
        const languages = await fetchLanguagesForRepo(repo.full_name)

        // Create a custom structure with the fields we need
        return {
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          html_url: repo.html_url,
          description: repo.description,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          pushed_at: repo.pushed_at,
          homepage: repo.homepage,
          size: repo.size,
          stargazers_count: repo.stargazers_count,
          watchers_count: repo.watchers_count,
          forks_count: repo.forks_count,
          language: repo.language,
          languages: languages,
          // Add custom fields that can be edited manually
          image: "", // Add custom image URL here
          featured: false, // Mark as featured project
          visible: true, // Set to false to hide this repository
          custom_description: "", // Override GitHub description
          demo_url: repo.homepage || "", // Demo URL (defaults to homepage)
          tags: [], // Add custom tags
        }
      }),
    )

    // Create the data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), "data")
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Write to JSON file with pretty formatting
    const outputPath = path.join(dataDir, "repositories.json")
    fs.writeFileSync(outputPath, JSON.stringify(reposWithLanguages, null, 2))

    console.log(`Successfully saved ${reposWithLanguages.length} repositories to ${outputPath}`)
    console.log("\nYou can now edit this file to:")
    console.log("- Add custom images by filling in the 'image' field")
    console.log("- Hide repositories by setting 'visible' to false")
    console.log("- Feature important projects by setting 'featured' to true")
    console.log("- Add custom descriptions with 'custom_description'")
    console.log("- Add custom tags in the 'tags' array")
  } catch (error) {
    console.error("Error generating repositories JSON:", error)
  }
}

// Run the script
generateReposJson()

