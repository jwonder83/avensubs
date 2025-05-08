import SubscribeDetailClient from "./SubscribeDetailClient";

type Props = {
  params: {
    id: string;
  };
};

export default function SubscribeDetailPage({ params }: Props) {
  return <SubscribeDetailClient id={params.id} />;
} 