# Basic Concepts

Before using the Bika.ai Open API, you need to understand the structure and object hierarchy of Bika.ai.

## Space

The Space is your workspace. It encompasses all the node resources, including:

### Node Resources

- Database
- Automation
- Dashboard
- Document
- AI Chatbot
- And more...

## Data Structure Hierarchy

When leveraging the Open API, data retrieval must be carried out in accordance with this structure:

```
Space A
  └── Node B
        └── Resource
              └── Database C
```

For instance, if you aim to obtain the database C represented by node B within Space A, the API structure would be:

```
spaceA.nodeB -> resource -> databaseC
```

## Important Note

**Node ID is equivalent to Resource ID**

For example:
- Node ID = Database ID
- Node ID = Automation ID

## URL Structure

For a Bika.ai URL like:

```
https://bika.ai/space/spcND68gdMMZBmGK67gvqNVX/node/datJubyEnetNFd3UQ6gSeq7U/viwYHuzUxRngq5igMkw9PPIX
```

The components are:

- **SpaceId**: `spcND68gdMMZBmGK67gvqNVX`
- **NodeID** (= DatabaseID): `datJubyEnetNFd3UQ6gSeq7U`

## TypeScript SDK

The associated TypeScript SDK is designed in an **object-oriented style**, which greatly simplifies your code by following the same hierarchical structure.

## UI Structure

The space UI follows the above data structure layer. For details, please read the homepage of the help document at https://bika.ai/help to view the overall UI introduction of the Space.

## API Communication

OpenAPI is composed of the HTTP protocol. You can access these OpenAPI endpoints using any HTTP client that supports them, such as:

- cURL
- Python Requests
- Node.js axios
- Rust reqwest
- And others

For more API details, please check the [Bika.ai API Reference](https://bika.ai/help).
