import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";

export default function NotFound() {
  return (
    <PageContainer className="flex flex-col items-center py-24 text-center sm:py-32">
      <Reveal className="flex flex-col items-center gap-6">
        <span className="text-sm font-medium text-primary">404</span>
        <h1 className="text-h2 font-extrabold text-foreground">This page wandered off</h1>
        <p className="max-w-xl text-body text-body">
          We couldn't find the page you were looking for. It may have moved, or the link might be
          out of date.
        </p>
        <Button as={Link} to="/" variant="primary">
          Back to home
        </Button>
      </Reveal>
    </PageContainer>
  );
}
