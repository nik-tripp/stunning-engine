import { trpc } from "../utils/trpc";
import { NextPageWithLayout } from "./_app";
import {
  Anchor,
  Autocomplete,
  Button,
  Card,
  Container,
  Stack,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const IndexPage: NextPageWithLayout = () => {
  const formController = useForm({ initialValues: { labelIdStartsWith: "" } });
  const { data: retrievedShipments, isFetching: fetchingShipments } = trpc.shipment.list.useQuery(
    formController.values,
    {
      enabled: formController.values.labelIdStartsWith.length >= 2,
    },
  );

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
          <Text>Start typing your kit ID to find your tracking information</Text>
          <form>
            <Stack>
              <Autocomplete
                label="Kit ID"
                {...formController.getInputProps("labelIdStartsWith")}
                data={retrievedShipments?.map((shipment) => shipment.labelId) ?? []}
              />
            </Stack>
          </form>
          {retrievedShipments?.length == 1 && (
            <>
              <Text>Your tracking ID is {retrievedShipments[0]?.shippingTrackingCode}</Text>
              <Anchor
                href={`https://www.fedex.com/fedextrack/?trknbr=${retrievedShipments[0]?.shippingTrackingCode}`}
                target="_blank"
              >
                Track your shipment with FedEx
              </Anchor>
            </>
          )}
          {formController.values.labelIdStartsWith.length >= 2 &&
            !fetchingShipments &&
            !retrievedShipments && (
              <Text>Sorry, we didn&apos;t find anything for that kit label</Text>
            )}
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
