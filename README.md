# BlowIt - Privacy-First Evidence Platform

BlowIt is a privacy-focused platform for sharing evidence with optional human verification using Self Protocol. Built with Next.js, React, and Supabase.

## Features

- 🔒 **Privacy-First**: Minimal data collection, only essential verification
- ✅ **Optional Human Verification**: Self Protocol integration for credibility
- 🎯 **Evidence Sharing**: Secure and verifiable evidence publication
- 🛡️ **Blockchain Integration**: Railgun Community wallet support
- 📱 **Mobile Optimized**: Responsive design with PWA support

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Verification**: Self Protocol
- **Blockchain**: Railgun Community Wallet
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account
- Self Protocol setup (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/blowit.git
cd blowit
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key | Yes |

## Self Protocol Integration

BlowIt integrates with Self Protocol for optional human verification:

1. **QR Code Generation**: Users can scan a QR code with the Self app
2. **Privacy-First**: Only shares nationality and age verification
3. **Backend Verification**: Your backend verifies proofs using SelfBackendVerifier
4. **Verification Badges**: Users receive verification badges for credibility

### Backend Setup

Your backend needs a `/verify` endpoint that accepts proof verification requests from Self Protocol. See the backend documentation for implementation details.

## Database Schema

The application uses Supabase with the following main tables:

- `posts`: Evidence posts with verification status
- `claims`: User claims and evidence
- `users`: User profiles and verification data

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Website**: [https://goblow.it](https://goblow.it)
- **Documentation**: [https://docs.goblow.it](https://docs.goblow.it)
- **Issues**: [GitHub Issues](https://github.com/your-username/blowit/issues)

## Acknowledgments

- [Self Protocol](https://self.xyz) for privacy-preserving verification
- [Railgun Community](https://railgun.org) for privacy-focused blockchain integration
- [Supabase](https://supabase.com) for the backend infrastructure
- [Next.js](https://nextjs.org) for the amazing React framework
