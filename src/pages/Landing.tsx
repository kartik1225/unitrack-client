import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Calendar, FileText, ArrowRight, Check, ChevronRight } from 'lucide-react';

const LandingPage = () => {
    const features = [
        {
            icon: <GraduationCap className="h-12 w-12 text-primary" />,
            title: "University Management",
            description: "Track your university applications and deadlines in one place."
        },
        {
            icon: <Calendar className="h-12 w-12 text-primary" />,
            title: "Deadline Tracking",
            description: "Never miss important deadlines with our smart reminder system."
        },
        {
            icon: <FileText className="h-12 w-12 text-primary" />,
            title: "Document Organization",
            description: "Keep all your application documents organized and accessible."
        }
    ];

    const benefits = [
        "Centralized application tracking",
        "Smart deadline reminders",
        "Document management system",
        "University research tools",
        "Application progress tracking",
        "Collaborative features"
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navigation */}
            <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <span className="text-2xl font-bold text-primary">UniTrack</span>
                        <div className="flex gap-4">
                            <Button variant="ghost" asChild>
                                <Link to="/auth">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link to="/auth?signup=true">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-white to-gray-50">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                    Simplify Your University
                    <span className="text-primary"> Applications</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mb-8">
                    Track applications, manage deadlines, and organize documents - all in one place.
                    Make your university application process stress-free.
                </p>
                <div className="flex gap-4">
                    <Button size="lg" asChild>
                        <Link to="/auth?signup=true">
                            Get Started Free
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline">
                        Learn More
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardContent className="pt-6 text-center">
                                    <div className="flex justify-center mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose UniTrack</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">
                                Everything you need to manage your university applications
                            </h3>
                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="bg-primary/10 rounded-full p-1">
                                            <Check className="h-4 w-4 text-primary" />
                                        </div>
                                        <span>{benefit}</span>
                                    </div>
                                ))}
                            </div>
                            <Button className="mt-8" size="lg" asChild>
                                <Link to="/auth?signup=true">
                                    Start Your Journey
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg transform rotate-3"></div>
                            <img
                                src="/dashboard.png"
                                alt="Dashboard Preview"
                                className="relative rounded-lg shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t py-12 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary">UniTrack</span>
                        <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved
            </span>
                    </div>
                    <div className="flex gap-6">
                        <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                            Privacy Policy
                        </Link>
                        <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                            Terms of Service
                        </Link>
                        <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
