import useSWR from "swr";
import { fetchAPI } from "lib";

/*
 Wondering if it better to do single hook calls or do a single call retrieving the user 
 and use it to access it's info.
 Because if I do multiple hooks I will be doing several api calls I think.
 */

export function useUserFeed() {
  const { data, error, mutate } = useSWR("/user/feed", fetchAPI, {
    revalidateOnFocus: true,
  });
  return { data, mutate };
}

export function useUser() {
  const { data, error, mutate } = useSWR("/user", fetchAPI, {
    revalidateOnFocus: false,
  });
  return { me: data?.me, mutate };
}

export function useOthersProfile(userId) {
  const useridToNumb = parseInt(userId);
  const { data, error } = useSWR("/user/profile/" + useridToNumb, fetchAPI);
  return data;
}

export function useMostFollowedUsers() {
  const { data } = useSWR("/user/get/top", fetchAPI);
  return data;
}
