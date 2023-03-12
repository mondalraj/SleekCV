Features of SleekCV

- Storing all your CVs data in PostgreSQL database
- Uploading completely build CV to IPFS
- Easily Access your CVs from anywhere
- Generating PDF from Simple Form
- Customizing order of sections in your CV
- Github Authentication (Easy Login) - NextAuth (Integration with Prisma)
- 2 different CV templates
- 2 different Font Family (Times Roman and Helvetica)

### Database Schema of CV

```js
{
    uuid: string,
    user_profile_id: string,
    profile: {
        name: string,
        email: string,
        phone: string,
        linkedin: string,
        portfolio: string,
    },
    education: {
        id: number;
        institution: string;
        title: string;
        location: string;
        period: string;
    }[],
    experience: {
        title: string,
        company: string,
        location: string,
        start_date: string,
        end_date: string,
        description: string[],
    }[],
    skills: {
        languages: string[],
        frameworks_libraries: string[],
        databases: string[],
        developer_tools: string[],
    },
    projects: {
        title: string,
        description: string[],
        duration: string,
        link: string,
        tech_stack: string[],
    }[],
    achievements: {
        title: string,
        description: string,
        date: string,
    }[],
    references: {
        name: string,
        email: string,
        phone: string,
        description: string,
    }[],
}
```

### How to run

- Clone the repo
- Install dependencies
- Create a .env file in the root directory and add the following variables

  - DATABASE_URL
  - NEXTAUTH_URL
  - GITHUB_ID
  - GITHUB_SECRET
  - JWT_SECRET

- Run the following commands

  - yarn
  - yarn dev
  - yarn prisma migrate dev
  - yarn prisma generate

- To check the database schema, run the following command
  - yarn prisma studio
