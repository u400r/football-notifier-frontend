import { useEffect, useState } from 'react';

interface SvgInlineProps {
  className: string;
  url: string | undefined;
}

export const SvgInline = (props: SvgInlineProps) => {
  const [svg, setSvg] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  useEffect(() => {
    if (props.url) {
      fetch(props.url)
        .then((res) => res.text())
        .then(setSvg)
        .catch(setIsErrored)
        .then(() => setIsLoaded(true));
    }
  }, [props.url]);

  return (
    <div
      className={`${props.className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
