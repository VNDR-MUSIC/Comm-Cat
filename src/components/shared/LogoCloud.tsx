import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type LogoCloudProps = {
    title: string;
};

const LogoCloud = ({ title }: LogoCloudProps) => {
    const logos = PlaceHolderImages.filter((img) => img.id.startsWith('logo-'));

    return (
        <div className="py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center font-headline text-lg font-semibold leading-8 text-foreground">
                   {title}
                </h2>
                <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    {logos.map((logo) => (
                         <Image
                            key={logo.id}
                            src={logo.imageUrl}
                            alt={logo.description}
                            width={158}
                            height={48}
                            data-ai-hint={logo.imageHint}
                            className="col-span-1 max-h-12 w-full object-contain lg:col-span-1 filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LogoCloud;
