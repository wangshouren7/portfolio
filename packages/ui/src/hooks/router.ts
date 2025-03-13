/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useMemoizedFn } from "ahooks";
import { type NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  ReadonlyURLSearchParams,
  useRouter as useNextRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { patchSearchParams } from "../lib/utils";

export function useRouter() {
  try {
    const router = useNextRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const replaceSearchParams = useMemoizedFn(
      (object: any, options?: NavigateOptions) => {
        const newSearchParams = patchSearchParams(searchParams, object);
        if (newSearchParams.toString() !== searchParams.toString()) {
          router.replace(`?${newSearchParams.toString()}`, options);
        }
      },
    );

    return {
      router,
      pathname,
      searchParams,
      replaceSearchParams,
    };
  } catch {
    // only for storybook
    return {
      router: null,
      pathname: "",
      searchParams: new ReadonlyURLSearchParams(),
      replaceSearchParams: null,
    };
  }
}
