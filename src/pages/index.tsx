import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import { Button, Container, MantineProvider, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

const IndexPage: NextPageWithLayout = () => {
  const formController = useForm({ initialValues: { labelId: '' } });
  const [searchLabel, setSearchLabel] = useState('');
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
    <MantineProvider>
      <Container>
        <form onSubmit={formController.onSubmit((values) => setSearchLabel(values.labelId))}>
          <TextInput label="Kit ID" {...formController.getInputProps('labelId')} />
          <Button type="submit">Find my Shipment Info</Button>
        </form>
      </Container>
      {retrievedShipment && 'Located shipment'}
    </MantineProvider>
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
