import { trpc } from "../utils/trpc";
import { NextPageWithLayout } from "./_app";
import { Button, Card, Container, Stack, TextInput, Title, Text, Anchor } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

const IndexPage: NextPageWithLayout = () => {
  const formController = useForm({ initialValues: { labelId: "" } });
  const [searchLabel, setSearchLabel] = useState("");
  const { data: retrievedShipment } = trpc.shipment.byLabelId.useQuery(formController.values, {
    enabled: Boolean(searchLabel),
  });

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   const allPosts = postsQuery.data?.pages.flatMap((page) => page.items) ?? [];
  //   for (const { id } of allPosts) {
  //     void utils.post.byId.prefetch({ id });
  //   }
  // }, [postsQuery.data, utils]);

  return (
    <Container sx={{ height: "100vh" }}>
      <Card p="xl">
        <Stack>
          <Title>Track your shipment</Title>
          <Text>Enter your kit ID to find your tracking information</Text>
          <form onSubmit={formController.onSubmit((values) => setSearchLabel(values.labelId))}>
            <Stack>
              <TextInput label="Kit ID" {...formController.getInputProps("labelId")} />
              <Button type="submit">Find my Shipment Info</Button>
            </Stack>
          </form>
          {Boolean(searchLabel) &&
            (retrievedShipment ? (
              <>
                <Text>Your tracking ID is {retrievedShipment.shippingTrackingCode}</Text>
                <Anchor
                  href={`https://www.fedex.com/fedextrack/?trknbr=${retrievedShipment.shippingTrackingCode}`}
                  target="_blank"
                >
                  Track your shipment with FedEx
                </Anchor>
              </>
            ) : (
              <Text>Sorry, we didn&apos;t find anything for that kit label</Text>
            ))}
        </Stack>
      </Card>
    </Container>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createProxySSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.post.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
