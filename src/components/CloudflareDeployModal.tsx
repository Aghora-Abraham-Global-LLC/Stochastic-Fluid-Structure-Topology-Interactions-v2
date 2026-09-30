import React, { useState } from 'react';
import { Cloud, Copy, Check, ExternalLink, Terminal, Globe, ArrowRight, ShieldCheck, X } from 'lucide-react';

interface CloudflareDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CloudflareDeployModal: React.FC<CloudflareDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [customSubdomain, setCustomSubdomain] = useState<string>('spde');
  const [domainName, setDomainName] = useState<string>('yourdomain.com');

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const wranglerDeployCommand = `npm run build\nnpx wrangler pages deploy dist --project-name=spde-fluid-topology`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-neutral-200 dark:border-neutral-800">
          <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shadow-inner">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              Cloudflare Subdomain Live Deployment Guide
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300 font-mono font-medium">
                Cloudflare Pages
              </span>
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Host this academic paper, live interactive simulation, and mathematical solver on your custom Cloudflare domain.
            </p>
          </div>
        </div>

        {/* Interactive Subdomain Preview Generator */}
        <div className="my-6 p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50">
          <label className="block text-xs font-semibold uppercase tracking-wider text-orange-800 dark:text-orange-300 mb-2">
            Configure Your Custom Subdomain:
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-1 w-full sm:w-auto">
              <span className="text-xs font-mono text-neutral-500">https://</span>
              <input
                type="text"
                value={customSubdomain}
                onChange={(e) => setCustomSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="subdomain"
                className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-500 w-32"
              />
              <span className="text-sm font-bold text-neutral-400">.</span>
            </div>
            <input
              type="text"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value.toLowerCase())}
              placeholder="yourdomain.com"
              className="flex-1 px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
            />
          </div>
          <div className="mt-2 text-xs text-neutral-600 dark:text-neutral-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-orange-600" />
            <span>Target Live URL:</span>
            <span className="font-mono font-semibold text-orange-700 dark:text-orange-400">
              https://{customSubdomain || 'spde'}.{domainName || 'yourdomain.com'}
            </span>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-6 text-sm">
          {/* Method A: Cloudflare Wrangler CLI (Fastest - 1 minute) */}
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-500" />
                Option 1: Deploy with Cloudflare Wrangler CLI
              </h3>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                Recommended
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
              Run this single command from your project directory to compile and push straight to Cloudflare Pages:
            </p>
            <div className="relative group">
              <pre className="p-3 bg-neutral-900 text-neutral-100 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed border border-neutral-800">
                {wranglerDeployCommand}
              </pre>
              <button
                onClick={() => copyToClipboard(wranglerDeployCommand, 1)}
                className="absolute top-2 right-2 p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded text-xs flex items-center gap-1 transition-colors"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIndex === 1 ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Method B: Cloudflare Pages Dashboard (Git Integration) */}
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2 mb-2">
              <Cloud className="w-4 h-4 text-orange-500" />
              Option 2: Connect GitHub Repo to Cloudflare Dashboard
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300 ml-1">
              <li>Log in to your <strong>Cloudflare Dashboard</strong> → <strong>Workers &amp; Pages</strong> → <strong>Create Application</strong> → <strong>Pages</strong>.</li>
              <li>Select <strong>Connect to Git</strong> and pick this repository.</li>
              <li>Configure the build settings:
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1 font-mono text-[11px] text-neutral-700 dark:text-neutral-300">
                  <li>Framework preset: <span className="text-orange-600 dark:text-orange-400">Vite</span></li>
                  <li>Build command: <span className="text-indigo-600 dark:text-indigo-400">npm run build</span></li>
                  <li>Build output directory: <span className="text-indigo-600 dark:text-indigo-400">dist</span></li>
                  <li>Node.js version: <span className="text-emerald-600 dark:text-emerald-400">20+</span> (set env <code className="bg-neutral-200 dark:bg-neutral-800 px-1 rounded">NODE_VERSION=20</code>)</li>
                </ul>
              </li>
              <li>Click <strong>Save and Deploy</strong>. Cloudflare builds and deploys your site in under 30 seconds.</li>
            </ol>
          </div>

          {/* Setting Up the Custom Subdomain in Cloudflare DNS */}
          <div className="p-4 rounded-xl border border-orange-200 dark:border-orange-800/60 bg-orange-50/30 dark:bg-orange-950/20">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-orange-600" />
              Step 3: Point Your Subdomain ({customSubdomain || 'spde'}.{domainName || 'yourdomain.com'})
            </h3>
            <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
              <p>
                In Cloudflare, connecting a subdomain to Pages is automatic:
              </p>
              <ol className="list-decimal list-inside space-y-1 ml-1">
                <li>Go to your Pages project in Cloudflare → Click the <strong>Custom domains</strong> tab.</li>
                <li>Click <strong>Set up a custom domain</strong>.</li>
                <li>Enter <code className="font-mono bg-neutral-200 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-800 dark:text-neutral-200">{customSubdomain || 'spde'}.{domainName || 'yourdomain.com'}</code> and click <strong>Continue</strong>.</li>
                <li>Cloudflare will automatically create the DNS <strong>CNAME</strong> record:
                  <div className="mt-2 p-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg font-mono text-[11px] grid grid-cols-4 gap-2 text-center">
                    <div><span className="text-neutral-400 block text-[9px]">TYPE</span>CNAME</div>
                    <div><span className="text-neutral-400 block text-[9px]">NAME</span>{customSubdomain || 'spde'}</div>
                    <div className="truncate"><span className="text-neutral-400 block text-[9px]">TARGET</span>spde-fluid-topology.pages.dev</div>
                    <div><span className="text-neutral-400 block text-[9px]">PROXY</span>Proxied (Orange)</div>
                  </div>
                </li>
                <li>Click <strong>Activate Domain</strong>. Cloudflare will automatically issue and provision a free SSL/TLS certificate with zero configuration!</li>
              </ol>
            </div>
          </div>

          {/* Included Configuration Files Info */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800/80 text-xs text-neutral-600 dark:text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              Pre-configured Cloudflare routing (<code className="font-mono text-neutral-800 dark:text-neutral-200">public/_routes.json</code>), security &amp; font caching headers (<code className="font-mono text-neutral-800 dark:text-neutral-200">public/_headers</code>), and <code className="font-mono text-neutral-800 dark:text-neutral-200">wrangler.toml</code> are already included in this repository.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-semibold text-xs hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
          >
            Got it, close guide
          </button>
        </div>
      </div>
    </div>
  );
};
